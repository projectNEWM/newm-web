import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosProgressEvent } from "axios";
import { enableWallet } from "@newm.io/cardano-dapp-wallet-connector";
import {
  SilentError,
  asThunkHook,
  isCloudinaryUrl,
  sleep,
} from "@newm-web/utils";
import { MintingStatus, Song } from "@newm-web/types";
import {
  Collaboration,
  CollaborationStatus,
  DeleteSongRequest,
  GetUserWalletSongsRequest,
  PatchSongThunkRequest,
  UpdateCollaborationsRequest,
  UploadSongThunkRequest,
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
import { handleUploadProgress } from "../../modules/ui/utils";
import { UploadSongError } from "../../common";
import { sessionApi } from "../../modules/session";
import {
  clearProgressBarModal,
  setIsProgressBarModalOpen,
  setProgressBarModal,
  setToastMessage,
} from "../../modules/ui";
import { uploadToCloudinary } from "../../api/cloudinary/utils";
import { history } from "../../common/history";
import { GenerateArtistAgreementBody, lambdaApi } from "../../api";

/**
 * Retreive a Cloudinary signature, use the signature to upload
 * the album cover art image to Cloudinary, upload the song to AWS,
 * save the song in the NEWM back-end with the file url information,
 * save the generated artist agreement if minting and then fetch the user's songs.
 */
export const uploadSong = createAsyncThunk(
  "song/uploadSong",
  async (body: UploadSongThunkRequest, { dispatch }) => {
    let songId = "";
    const progressDisclaimer =
      "Please do not refresh the page or navigate away while the " +
      "upload is in progress.";

    try {
      dispatch(setIsProgressBarModalOpen(true));

      // set upload status bar position from HTTP upload event progress
      const onUploadImageProgress = ({ progress }: AxiosProgressEvent) => {
        const totalIncrement = body.isMinting ? 25 : 45;

        handleUploadProgress({
          baseProgress: 0,
          disclaimer: progressDisclaimer,
          dispatch,
          message: "Uploading song image...",
          progress,
          totalIncrement,
        });
      };

      // downsize if necessary
      const uploadParams = {
        eager: "c_limit,w_4000,h_4000",
      };

      const coverArtUrl = await uploadToCloudinary(
        body.coverArtUrl as File,
        uploadParams,
        dispatch,
        onUploadImageProgress
      );

      // Backend expects "Non-Explicit" for clean songs, any value for explicit
      const parentalAdvisory = body.isExplicit ? "Explicit" : "Non-Explicit";

      // combination of all IPI values for the song if present
      let ipis;

      if (body.ipis) {
        ipis = body.ipi ? [...body.ipis, body.ipi] : body.ipis;
      } else {
        ipis = body.ipi ? [body.ipi] : undefined;
      }

      // Convert barcodeType to the value expected by the API
      const barcodeTypeMapping: { [key: string]: string | undefined } = {
        EAN: "Ean",
        JAN: "Jan",
        UPC: "Upc",
      };

      // if barcodeNumber isn't present, barcodeType shouldn't be provided
      const barcodeType =
        body.barcodeNumber && body.barcodeType
          ? barcodeTypeMapping[body.barcodeType]
          : undefined;

      const releaseYear = body.releaseDate?.split("-")[0];
      const defaultCopyright = body.artistName || body.companyName;

      // create the song in the NEWM API
      const songResp = await dispatch(
        songApi.endpoints.uploadSong.initiate({
          album: body.album,
          barcodeNumber: body.barcodeNumber || undefined,
          barcodeType,
          compositionCopyrightOwner:
            body.compositionCopyrightOwner || defaultCopyright,
          compositionCopyrightYear:
            body.compositionCopyrightYear || releaseYear,
          coverArtUrl,
          coverRemixSample: body.isCoverRemixSample,
          description: body.description,
          genres: body.genres,
          instrumental: body.isInstrumental,
          ipis,
          isrc: body.isrc || undefined,
          iswc: body.iswc || undefined,
          language: body.language,
          lyricsUrl: body.lyricsUrl,
          moods: body.moods,
          parentalAdvisory,
          phonographicCopyrightOwner:
            body.phonographicCopyrightOwner || defaultCopyright,
          phonographicCopyrightYear:
            body.phonographicCopyrightYear || releaseYear,
          publicationDate: body.publicationDate || undefined,
          releaseDate: body.releaseDate || undefined,
          title: body.title,
          track: body.track,
        })
      );

      if ("error" in songResp) throw new SilentError();

      songId = songResp.data.songId;

      // set upload status bar position from HTTP upload event progress
      const onUploadSongProgress = ({ progress }: AxiosProgressEvent) => {
        const baseProgress = body.isMinting ? 25 : 45;
        const totalIncrement = body.isMinting ? 50 : 50;

        handleUploadProgress({
          baseProgress,
          disclaimer: progressDisclaimer,
          dispatch,
          message: "Uploading song audio...",
          progress,
          totalIncrement,
        });
      };

      const uploadSongAudioResponse = await dispatch(
        songApi.endpoints.uploadSongAudio.initiate({
          audio: body.audio,
          onUploadProgress: onUploadSongProgress,
          songId,
        })
      );

      if ("error" in uploadSongAudioResponse) throw new UploadSongError();

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
                credited: collaboration.isCredited,
                email: collaboration.email,
                featured: collaboration.isFeatured,
                role: collaboration.role,
                royaltyRate: collaboration.royaltyRate,
                songId,
              })
            );
          })
        );

        for (const collabResp of collabResponses) {
          if ("error" in collabResp) throw new SilentError();
        }

        dispatch(
          setProgressBarModal({
            animationSeconds: 4,
            disclaimer: progressDisclaimer,
            message: "Processing artist agreement...",
            progress: 85,
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
            accepted: body.consentsToContract,
            songId,
          })
        );

        if ("error" in processStreamTokenAgreementResponse) {
          throw new SilentError();
        }

        dispatch(
          setProgressBarModal({
            animationSeconds: 6,
            disclaimer: progressDisclaimer,
            message:
              "Requesting minting payment. " +
              "Please sign transaction when prompted.",
            progress: 95,
          })
        );

        await submitMintSongPayment(songId, dispatch);
      }

      // display most recent status and allow progress animation to complete
      dispatch(
        setProgressBarModal({
          animationSeconds: 0.25,
          disclaimer: progressDisclaimer,
          message: body.isMinting
            ? "Requesting minting payment. " +
              "Please sign transaction when prompted."
            : "Uploading song audio...",
          progress: 100,
        })
      );
      await sleep(250);

      // navigate to library page to view new song
      history.push("/home/library");
    } catch (error) {
      // delete the song if it exists
      if (songId) {
        try {
          await dispatch(
            songApi.endpoints.deleteSong.initiate({ showToast: false, songId })
          );
        } catch (error) {
          // do nothing
        }
      }

      if (error instanceof UploadSongError) {
        history.push("/home/upload-song");
      }

      if (error instanceof SilentError) {
        return;
      }

      if (error instanceof Error) {
        dispatch(
          setToastMessage({
            message: error.message,
            severity: "error",
          })
        );
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
      if (!audioStreamResp.data) return;
      const data = audioStreamResp.data;
      return {
        song: {
          ...data.song,
          streamUrl: data.streamData?.url,
        },
      };
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
  async (body: PatchSongThunkRequest, { dispatch }) => {
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
        ipis = body.ipi ? [...body.ipis, body.ipi] : body.ipis;
      } else {
        ipis = body.ipi ? [body.ipi] : undefined;
      }

      // Convert barcodeType to the value expected by the API
      const barcodeTypeMapping: { [key: string]: string | undefined } = {
        EAN: "Ean",
        JAN: "Jan",
        UPC: "Upc",
      };

      // if barcodeNumber isn't present, barcodeType shouldn't be provided
      const barcodeType =
        body.barcodeNumber && body.barcodeType
          ? barcodeTypeMapping[body.barcodeType]
          : undefined;

      const releaseYear = body.releaseDate?.split("-")[0];
      const defaultCopyright = body.artistName || body.companyName;

      // patch song information
      const patchSongResp = await dispatch(
        songApi.endpoints.patchSong.initiate({
          album: body.album,
          barcodeNumber: body.barcodeNumber || undefined,
          barcodeType,
          compositionCopyrightOwner:
            body.compositionCopyrightOwner || defaultCopyright,
          compositionCopyrightYear:
            body.compositionCopyrightYear || releaseYear,
          coverArtUrl,
          description: body.description,
          genres: body.genres,
          id: body.id,
          instrumental: body.isInstrumental,
          ipis,
          isrc: body.isrc || undefined,
          iswc: body.iswc || undefined,
          language: body.language,
          lyricsUrl: body.lyricsUrl,
          moods: body.moods,
          parentalAdvisory,
          phonographicCopyrightOwner:
            body.phonographicCopyrightOwner || defaultCopyright,
          phonographicCopyrightYear:
            body.phonographicCopyrightYear || releaseYear,
          publicationDate: body.publicationDate || undefined,
          releaseDate: body.releaseDate || undefined,
          title: body.title,
          track: body.track,
        })
      );

      if ("error" in patchSongResp) return;

      const isDeclined = body.mintingStatus === MintingStatus.Declined;

      if (
        !isDeclined &&
        (body.owners?.length || body.creditors?.length || body.featured?.length)
      ) {
        await dispatch(
          updateCollaborations({
            creditors: body.creditors || [],
            featured: body.featured || [],
            id: body.id,
            owners: body.owners || [],
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
              accepted: body.consentsToContract,
              songId: body.id,
            })
          );

          if ("error" in processStreamTokenAgreementResponse) return;

          // If declined, don't collect payment again
          if (isDeclined) {
            const reprocessSongResp = await dispatch(
              songApi.endpoints.reprocessSong.initiate(body.id)
            );

            if ("error" in reprocessSongResp) return;
          } else {
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

export const getUserWalletSongs = createAsyncThunk(
  "song/getUserWalletSongs",
  async (
    body: Omit<GetUserWalletSongsRequest, "utxoCborHexList">,
    { dispatch }
  ) => {
    try {
      const wallet = await enableWallet();
      const utxoCborHexList = (await wallet.getUtxos()) || [];

      return await dispatch(
        songApi.endpoints.getUserWalletSongs.initiate({
          ...body,
          utxoCborHexList,
        })
      );
    } catch (err) {
      // do nothing, errors handled by endpoints
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
    ) {
      return;
    }

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
              credited: collaboration.credited,
              email: collaboration.email,
              featured: collaboration.featured,
              role: collaboration.role,
              royaltyRate: collaboration.royaltyRate,
              songId: body.id,
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
              credited: collaboration.credited,
              email: collaboration.email,
              featured: collaboration.featured,
              role: collaboration.role,
              royaltyRate: collaboration.royaltyRate,
              songId: body.id,
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

export const useGetUserWalletSongsThunk = asThunkHook(getUserWalletSongs);
