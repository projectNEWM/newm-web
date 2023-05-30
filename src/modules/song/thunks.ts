import { asThunkHook } from "common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GenerateArtistAgreementBody, lambdaApi } from "api";
import { history } from "common/history";
import { uploadToCloudinary } from "api/cloudinary/utils";
import {
  Collaboration,
  CollaborationStatus,
  DeleteSongRequest,
  PatchSongRequest,
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
    try {
      // downsize if necessary
      const uploadParams = {
        eager: "c_fit,w_5000,h_5000",
      };

      const coverArtUrl = await uploadToCloudinary(
        body.coverArtUrl as File,
        uploadParams,
        dispatch
      );

      // create the song in the NEWM API
      const songResp = await dispatch(
        songApi.endpoints.uploadSong.initiate({
          ...body,
          coverArtUrl,
        })
      );

      if ("error" in songResp) return;

      const { songId } = songResp.data;

      // get signed upload url for AWS
      const audioUploadUrlResp = await dispatch(
        songApi.endpoints.getAudioUploadUrl.initiate({
          songId,
          fileName: body.audio.name,
        })
      );

      if ("error" in audioUploadUrlResp) return;

      const { url: uploadUrl, fields } = audioUploadUrlResp.data;

      // build a form with AWS presigned fields and upload audio to AWS
      // song audioUrl will be updated after it's transcoded
      const formData = new FormData();
      for (const key in fields) {
        formData.append(key, fields[key]);
      }
      const headers = new Headers({
        ContentDisposition: `filename=${body.audio.name}`,
      });

      formData.append("file", body.audio);

      await fetch(uploadUrl, {
        method: "POST",
        headers: Object.assign({}, headers),
        body: formData,
      });

      if (body.isMinting) {
        const collaborators = generateCollaborators(
          body.owners,
          body.creditors
        );

        // TODO: create bulk collaboration creation endpoint in API.
        const collabResponses = await Promise.all(
          collaborators.map((collaborator) => {
            return dispatch(
              songApi.endpoints.createCollaboration.initiate({
                songId,
                email: collaborator.email,
                role: collaborator.role,
                royaltyRate: collaborator.royaltyRate,
                credited: collaborator.isCredited,
              })
            );
          })
        );

        for (const collabResp of collabResponses) {
          if ("error" in collabResp) return;
        }

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

        if ("error" in generateArtistAgreementResponse) return;

        const processStreamTokenAgreementResponse = await dispatch(
          songApi.endpoints.processStreamTokenAgreement.initiate({
            songId,
            accepted: body.consentsToContract,
          })
        );

        if ("error" in processStreamTokenAgreementResponse) return;
      }

      // navigate to library page to view new song
      history.push("/home/library");
    } catch (err) {
      // do nothing, errors handled by endpoints
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
      let coverArtUrl;

      if (body.coverArtUrl) {
        // downsize if necessary
        const uploadParams = {
          eager: "c_fit,w_5000,h_5000",
        };

        coverArtUrl = await uploadToCloudinary(
          body.coverArtUrl as File,
          uploadParams,
          dispatch
        );
      }

      // patch song information
      const patchSongResp = await dispatch(
        songApi.endpoints.patchSong.initiate({
          ...body,
          ...{ coverArtUrl },
        })
      );

      if ("error" in patchSongResp) return;

      if (body.isMinting) {
        const currentCollabsResp = await dispatch(
          songApi.endpoints.getCollaborations.initiate({ songIds: body.id })
        );

        if ("error" in currentCollabsResp || !currentCollabsResp.data) return;

        const newCollaborators = generateCollaborators(
          body.owners || [],
          body.creditors || []
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
          collabsToCreate.map((collaborator) => {
            return dispatch(
              songApi.endpoints.createCollaboration.initiate({
                songId: body.id,
                email: collaborator.email,
                role: collaborator.role,
                royaltyRate: collaborator.royaltyRate,
                credited: collaborator.credited,
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
              })
            );
          })
        );

        for (const collabResp of updateCollabResponses) {
          if ("error" in collabResp) return;
        }
      }

      if (body.title && body.artistName) {
        await dispatch(
          generateArtistAgreement({
            artistName: body.artistName,
            companyName: body.companyName,
            saved: true,
            songId: body.id,
            songName: body.title,
            stageName: body.stageName,
          })
        );
      }

      // navigate to library page to view updated song
      history.push("/home/library");
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
    )
      return;

    const collaboratorsPromises = collaborationsData.map(
      (collaboration: Collaboration) => createInvite(collaboration, dispatch)
    );

    const collaborators = await Promise.all(collaboratorsPromises);

    return collaborators;
  }
);

export const useUploadSongThunk = asThunkHook(uploadSong);

export const useFetchInvitesThunk = asThunkHook(fetchInvites);

export const usePatchSongThunk = asThunkHook(patchSong);

export const useDeleteSongThunk = asThunkHook(deleteSong);

export const useGenerateArtistAgreementThunk = asThunkHook(
  generateArtistAgreement
);
