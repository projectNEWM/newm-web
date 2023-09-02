import { asThunkHook } from "common/reduxUtils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GenerateArtistAgreementBody, lambdaApi } from "api";
import { history } from "common/history";
import { uploadToCloudinary } from "api/cloudinary/utils";
import {
  clearProgressBarModal,
  setIsProgressBarModalOpen,
  setProgressBarModal,
  setToastMessage,
} from "modules/ui";
import { sessionApi } from "modules/session";
import { SilentError, isCloudinaryUrl, sleep } from "common";
import {
  Collaboration,
  CollaborationStatus,
  DeleteSongRequest,
  MintingStatus,
  PatchSongRequest,
  Song,
  UpdateCollaborationsRequest,
  UploadSongRequest,
} from "./types";
import { extendedApi as songApi } from "./api";
import { receiveArtistAgreement } from "./slice";
import {
  createInvite,
  generateCollaborators,
  getCollaborationsToCreate,
  getCollaborationsToDelete,
  getCollaborationsToUpdate,
  mapCollaboratorsToCollaborations,
  submitMintSongPayment,
} from "./utils";

/**
 * Retreive a Cloudinary signature, use the signature to upload
 * the album cover art image to Cloudinary, upload the song to AWS,
 * save the song in the NEWM back-end with the file url information,
 * save the generated artist agreement if minting and then fetch the user's songs.
 */
export const uploadSong = createAsyncThunk(
  "song/uploadSong",
  async (body: UploadSongRequest, { dispatch }) => {
    let songId = "";
    const progressDisclaimer =
      "Please do not refresh the page or navigate away while the " +
      "upload is in progress.";

    try {
      dispatch(setIsProgressBarModalOpen(true));
      dispatch(
        setProgressBarModal({
          progress: body.isMinting ? 40 : 65,
          message: "Uploading song image...",
          disclaimer: progressDisclaimer,
          animationSeconds: 25,
        })
      );

      // downsize if necessary
      const uploadParams = {
        eager: "c_limit,w_4000,h_4000",
      };

      const coverArtUrl = await uploadToCloudinary(
        body.coverArtUrl as File,
        uploadParams,
        dispatch
      );

      // Backend expects "Non-Explicit" for clean songs, any value for explicit
      const parentalAdvisory = body.isExplicit ? "Explicit" : "Non-Explicit";

      // combination of all IPI values for the song if present
      let ipis;

      if (body.ipis) {
        ipis = body.userIpi ? [...body.ipis, body.userIpi] : body.ipis;
      } else {
        ipis = body.userIpi ? [body.userIpi] : undefined;
      }

      // Convert barcodeType to the value expected by the API
      const barcodeTypeMapping: { [key: string]: string | undefined } = {
        UPC: "Upc",
        EAN: "Ean",
        JAN: "Jan",
      };

      // if barcodeNumber isn't present, barcodeType shouldn't be provided
      const barcodeType =
        body.barcodeNumber && body.barcodeType
          ? barcodeTypeMapping[body.barcodeType]
          : undefined;

      // create the song in the NEWM API
      const songResp = await dispatch(
        songApi.endpoints.uploadSong.initiate({
          title: body.title,
          genres: body.genres,
          moods: body.moods,
          coverArtUrl,
          lyricsUrl: body.lyricsUrl,
          description: body.description,
          album: body.album,
          track: body.track,
          language: body.language,
          copyright: body.copyright || undefined,
          parentalAdvisory,
          barcodeType,
          barcodeNumber: body.barcodeNumber || undefined,
          isrc: body.isrc || undefined,
          iswc: body.iswc || undefined,
          ipis,
          releaseDate: body.releaseDate || undefined,
          publicationDate: body.publicationDate || undefined,
        })
      );

      if ("error" in songResp) throw new SilentError();

      dispatch(
        setProgressBarModal({
          progress: body.isMinting ? 75 : 95,
          message: "Uploading song audio...",
          disclaimer: progressDisclaimer,
          animationSeconds: 10,
        })
      );

      songId = songResp.data.songId;

      const uploadSongAudioResponse = await dispatch(
        songApi.endpoints.uploadSongAudio.initiate({
          songId,
          audio: body.audio,
        })
      );

      if ("error" in uploadSongAudioResponse)
        throw new SilentError("uploadSongAudioResponseError");

      if (body.isMinting) {
        const collaborators = generateCollaborators(
          body.owners,
          body.creditors,
          body.featured
        );

        // TODO: create bulk collaboration creation endpoint in API.
        const collabResponses = await Promise.all(
          collaborators.map((collaboration) => {
            return dispatch(
              songApi.endpoints.createCollaboration.initiate({
                songId,
                email: collaboration.email,
                role: collaboration.role,
                royaltyRate: collaboration.royaltyRate,
                credited: collaboration.isCredited,
                featured: collaboration.isFeatured,
              })
            );
          })
        );

        for (const collabResp of collabResponses) {
          if ("error" in collabResp) throw new SilentError();
        }

        dispatch(
          setProgressBarModal({
            progress: 85,
            message: "Processing artist agreement...",
            disclaimer: progressDisclaimer,
            animationSeconds: 4,
          })
        );

        const generateArtistAgreementResponse = await dispatch(
          generateArtistAgreement({
            artistName: body.artistName,
            companyName: body.companyName,
            saved: true,
            songId,
            songName: body.title,
            stageName: body.stageName,
          })
        );

        if ("error" in generateArtistAgreementResponse) throw new SilentError();

        const processStreamTokenAgreementResponse = await dispatch(
          songApi.endpoints.processStreamTokenAgreement.initiate({
            songId,
            accepted: body.consentsToContract,
          })
        );

        if ("error" in processStreamTokenAgreementResponse) {
          throw new SilentError();
        }

        dispatch(
          setProgressBarModal({
            progress: 95,
            message:
              "Requesting minting payment. " +
              "Please sign transaction when prompted.",
            disclaimer: progressDisclaimer,
            animationSeconds: 6,
          })
        );

        await submitMintSongPayment(songId, dispatch);
      }

      // display most recent status and allow progress animation to complete
      dispatch(
        setProgressBarModal({
          progress: 100,
          message: body.isMinting
            ? "Requesting minting payment. " +
              "Please sign transaction when prompted."
            : "Uploading song audio...",
          disclaimer: progressDisclaimer,
          animationSeconds: 0.25,
        })
      );
      await sleep(250);

      // navigate to library page to view new song
      history.push("/home/library");
    } catch (error) {
      // delete song and collaborators if they exist
      if (songId) {
        try {
          if (
            body.owners?.length ||
            body.creditors?.length ||
            body.featured?.length
          ) {
            await dispatch(
              updateCollaborations({
                id: songId,
                owners: [],
                creditors: [],
                featured: [],
              })
            );
          }

          await dispatch(
            songApi.endpoints.deleteSong.initiate({ songId, showToast: false })
          );
        } catch (error) {
          // do nothing
        }
      }

      if (error instanceof Error) {
        const isUploadSongAudioError =
          error.message === "uploadSongAudioResponseError";

        if (isUploadSongAudioError && body.isMinting) {
          history.push("/home/upload-song");
          return;
        }

        // non-endpoint related error occur, show toast
        if (!isUploadSongAudioError) {
          dispatch(
            setToastMessage({
              message: error.message,
              severity: "error",
            })
          );
        }
      }
    } finally {
      dispatch(setIsProgressBarModalOpen(false));
      dispatch(clearProgressBarModal());
    }
  }
);

export const fetchSongStream = createAsyncThunk(
  "song/streamSong",
  async (song: Song, { dispatch }) => {
    try {
      // get stream info for song
      const audioStreamResp = await dispatch(
        songApi.endpoints.getSongStream.initiate(song)
      );

      if ("error" in audioStreamResp) return;

      return audioStreamResp.data;
    } catch (error) {
      // non-endpoint related error occur, show toast
      if (error instanceof Error) {
        dispatch(
          setToastMessage({
            message: error.message,
            severity: "error",
          })
        );
      }
    }
  }
);

/**
 * Generates an artist agreement and then navigates
 * to the confirmation screen.
 */
export const generateArtistAgreement = createAsyncThunk(
  "song/generateArtistAgreement",
  async (body: GenerateArtistAgreementBody, { dispatch }) => {
    try {
      const artistAgreementResp = await dispatch(
        lambdaApi.endpoints.generateArtistAgreement.initiate(body)
      );

      if ("error" in artistAgreementResp) return;

      dispatch(receiveArtistAgreement(artistAgreementResp.data.message));
    } catch (err) {
      // do nothing
    }
  }
);

/**
 * Retreive a Cloudinary signature, use the signature to modify
 * the album cover art image to Cloudinary,
 * modify the song in the NEWM back-end with the file url information.
 */
export const patchSong = createAsyncThunk(
  "song/patchSong",
  async (body: PatchSongRequest, { dispatch }) => {
    try {
      let coverArtUrl: string | undefined;

      if (body.coverArtUrl instanceof File) {
        // downsize if necessary
        const uploadParams = {
          eager: "c_limit,w_4000,h_4000",
        };

        coverArtUrl = await uploadToCloudinary(
          body.coverArtUrl as File,
          uploadParams,
          dispatch
        );
      } else if (isCloudinaryUrl(body.coverArtUrl || "")) {
        coverArtUrl = body.coverArtUrl;
      }

      // Backend expects "Non-Explicit" for clean songs, any value for explicit
      const parentalAdvisory = body.isExplicit ? "Explicit" : "Non-Explicit";

      // combination of all IPI values for the song if present
      let ipis;

      if (body.ipis) {
        ipis = body.userIpi ? [...body.ipis, body.userIpi] : body.ipis;
      } else {
        ipis = body.userIpi ? [body.userIpi] : undefined;
      }

      // Convert barcodeType to the value expected by the API
      const barcodeTypeMapping: { [key: string]: string | undefined } = {
        UPC: "Upc",
        EAN: "Ean",
        JAN: "Jan",
      };

      // if barcodeNumber isn't present, barcodeType shouldn't be provided
      const barcodeType =
        body.barcodeNumber && body.barcodeType
          ? barcodeTypeMapping[body.barcodeType]
          : undefined;

      // patch song information
      const patchSongResp = await dispatch(
        songApi.endpoints.patchSong.initiate({
          id: body.id,
          title: body.title,
          genres: body.genres,
          moods: body.moods,
          lyricsUrl: body.lyricsUrl,
          description: body.description,
          album: body.album,
          track: body.track,
          language: body.language,
          copyright: body.copyright || undefined,
          parentalAdvisory,
          barcodeType,
          barcodeNumber: body.barcodeNumber || undefined,
          isrc: body.isrc || undefined,
          iswc: body.iswc || undefined,
          ipis,
          releaseDate: body.releaseDate || undefined,
          publicationDate: body.publicationDate || undefined,
          coverArtUrl,
        })
      );

      if ("error" in patchSongResp) return;

      if (
        body.owners?.length ||
        body.creditors?.length ||
        body.featured?.length
      ) {
        await dispatch(
          updateCollaborations({
            id: body.id,
            owners: body.owners || [],
            creditors: body.creditors || [],
            featured: body.featured || [],
          })
        );
      }

      if (body.isMinting) {
        const songResp = await dispatch(
          songApi.endpoints.getSong.initiate(body.id)
        );

        if ("error" in songResp || !songResp.data) return;

        const profileResp = await dispatch(
          sessionApi.endpoints.getProfile.initiate()
        );

        if ("error" in profileResp || !profileResp.data) return;

        // if body.isMinting is present and true, then the song is being
        // minted for the first time, save the artist agreement.
        await dispatch(
          generateArtistAgreement({
            artistName: `${profileResp.data.firstName} ${profileResp.data.lastName}`,
            companyName: profileResp.data.companyName,
            saved: true,
            songId: songResp.data.id,
            songName: songResp.data.title,
            stageName: profileResp.data.nickname,
          })
        );

        if (body.consentsToContract) {
          const processStreamTokenAgreementResponse = await dispatch(
            songApi.endpoints.processStreamTokenAgreement.initiate({
              songId: body.id,
              accepted: body.consentsToContract,
            })
          );

          if ("error" in processStreamTokenAgreementResponse) return;

          if (songResp.data.mintingStatus === MintingStatus.Undistributed) {
            await submitMintSongPayment(body.id, dispatch);
          }
        }
      }

      if (body.shouldRedirect) {
        dispatch(
          setToastMessage({
            message: "Updated song information",
            severity: "success",
          })
        );

        await sleep(250);

        // navigate to library page to view new song
        history.push("/home/library");
      }
    } catch (error) {
      // non-endpoint related error occur, show toast
      if (error instanceof Error) {
        dispatch(
          setToastMessage({
            message: error.message,
            severity: "error",
          })
        );
      }
    }
  }
);

/**
 * Request to delete user song. If successful, navigate to
 * library and fetch new songs.
 */
export const deleteSong = createAsyncThunk(
  "song/deleteSong",
  async (body: DeleteSongRequest, { dispatch }) => {
    try {
      // navigate to library page before deleting due to known
      // issue where RTK Query hook will re-fetch data after
      // delete call invalidates cache tag, causing 404 error to
      // display: https://github.com/reduxjs/redux-toolkit/issues/1672
      history.replace("/home/library");

      await dispatch(songApi.endpoints.deleteSong.initiate(body));
    } catch (err) {
      // do nothing, errors handled by endpoints
    }
  }
);

/**
 * Fetches collaborations in 'Waiting' status.
 * Dispatches invites to app state.
 */
export const fetchInvites = createAsyncThunk(
  "collaborator/fetchInvites",
  async (_, { dispatch }) => {
    const collaborationsResponse = await dispatch(
      songApi.endpoints.getCollaborations.initiate({
        inbound: true,
        statuses: [CollaborationStatus.Waiting],
      })
    );
    const collaborationsData = collaborationsResponse.data;

    if (
      !collaborationsData ||
      !collaborationsData.length ||
      "error" in collaborationsResponse
    )
      return;

    const collaboratorsPromises = collaborationsData.map(
      (collaboration: Collaboration) => createInvite(collaboration, dispatch)
    );

    const collaborators = await Promise.all(collaboratorsPromises);

    return collaborators;
  }
);

export const updateCollaborations = createAsyncThunk(
  "collaboration/updateCollaborations",
  async (body: UpdateCollaborationsRequest, { dispatch }) => {
    try {
      const currentCollabsResp = await dispatch(
        songApi.endpoints.getCollaborations.initiate({ songIds: body.id })
      );

      if ("error" in currentCollabsResp || !currentCollabsResp.data) return;

      const newCollaborators = generateCollaborators(
        body.owners || [],
        body.creditors || [],
        body.featured || []
      );

      const newCollabs = mapCollaboratorsToCollaborations(
        body.id,
        newCollaborators
      );

      const collabsToDelete = getCollaborationsToDelete(
        currentCollabsResp.data,
        newCollabs
      );

      const collabsToUpdate = getCollaborationsToUpdate(
        currentCollabsResp.data,
        newCollabs
      );

      const collabsToCreate = getCollaborationsToCreate(
        currentCollabsResp.data,
        newCollabs
      );

      const createCollabResponses = await Promise.all(
        collabsToCreate.map((collaboration) => {
          return dispatch(
            songApi.endpoints.createCollaboration.initiate({
              songId: body.id,
              email: collaboration.email,
              role: collaboration.role,
              royaltyRate: collaboration.royaltyRate,
              credited: collaboration.credited,
              featured: collaboration.featured,
            })
          );
        })
      );

      for (const collabResp of createCollabResponses) {
        if ("error" in collabResp) return;
      }

      const deleteCollabResponses = await Promise.all(
        collabsToDelete.map((collaborationId) => {
          return dispatch(
            songApi.endpoints.deleteCollaboration.initiate(collaborationId)
          );
        })
      );

      for (const collabResp of deleteCollabResponses) {
        if ("error" in collabResp) return;
      }

      const updateCollabResponses = await Promise.all(
        collabsToUpdate.map((collaboration) => {
          return dispatch(
            songApi.endpoints.updateCollaboration.initiate({
              collaborationId: collaboration.id,
              songId: body.id,
              email: collaboration.email,
              role: collaboration.role,
              royaltyRate: collaboration.royaltyRate,
              credited: collaboration.credited,
              featured: collaboration.featured,
            })
          );
        })
      );

      for (const collabResp of updateCollabResponses) {
        if ("error" in collabResp) return;
      }
    } catch (error) {
      // do nothing, endpoint errors handled by endpoints
    }
  }
);

export const useUploadSongThunk = asThunkHook(uploadSong);

export const useFetchSongStreamThunk = asThunkHook(fetchSongStream);

export const useFetchInvitesThunk = asThunkHook(fetchInvites);

export const usePatchSongThunk = asThunkHook(patchSong);

export const useDeleteSongThunk = asThunkHook(deleteSong);

export const useGenerateArtistAgreementThunk = asThunkHook(
  generateArtistAgreement
);
