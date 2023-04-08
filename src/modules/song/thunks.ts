import { asThunkHook } from "common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GenerateArtistAgreementPayload, lambdaApi } from "api";
import { history } from "common/history";
import { uploadToCloudinary } from "api/cloudinary/utils";
import { PatchSongRequest, UploadSongRequest } from "./types";
import { extendedApi as songApi } from "./api";

/**
 * Retreive a Cloudinary signature, use the signature to upload
 * the album cover art image to Cloudinary, upload the song to AWS,
 * save the song in the NEWM back-end with the file url information,
 * and then fetch the user's songs.
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
        body.image,
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

      const { uploadUrl } = audioUploadUrlResp.data;

      // upload audio to AWS, song audioUrl will be updated after it's transcoded
      await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/octet-stream" },
        body: body.audio,
      });

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
  async ({ body, callback }: GenerateArtistAgreementPayload, { dispatch }) => {
    try {
      const artistAgreementResp = await dispatch(
        lambdaApi.endpoints.generateArtistAgreement.initiate(body)
      );

      if ("error" in artistAgreementResp) return;

      callback();
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

      if (body.image) {
        // downsize if necessary
        const uploadParams = {
          eager: "c_fit,w_5000,h_5000",
        };

        coverArtUrl = await uploadToCloudinary(
          body.image,
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

      if ("error" in patchSongResp || !("data" in patchSongResp)) return;

      // navigate to library page to view updated song
      history.push("/home/library");
    } catch (err) {
      // do nothing, errors handled by endpoints
    }
  }
);

export const useUploadSongThunk = asThunkHook(uploadSong);

export const usePatchSongThunk = asThunkHook(patchSong);

export const useGenerateArtistAgreementThunk = asThunkHook(
  generateArtistAgreement
);
