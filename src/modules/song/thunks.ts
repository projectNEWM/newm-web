import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFileBinary } from "common";
import { history } from "common/history";
import { uploadToCloudinary } from "api/cloudinary/utils";
import {
  GenerateArtistAgreementPayload,
  PatchSongRequest,
  UploadSongRequest,
} from "./types";
import { extendedApi as songApi } from "./api";
import { setSongIsLoading } from "./slice";

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
      // set loading state to show loading indicator
      dispatch(setSongIsLoading(true));

      // optional upload params to format or crop image could go here
      const uploadParams = {};

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
      const audioBinaryStr = await getFileBinary(body.audio);

      // upload audio to AWS, song audioUrl will be updated after it's transcoded
      await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: audioBinaryStr }),
      });

      // navigate to library page to view new song
      history.push("/home/library");
    } catch (err) {
      // do nothing, errors handled by endpoints
    } finally {
      // done fetching songs
      dispatch(setSongIsLoading(false));
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
      dispatch(setSongIsLoading(true));

      const artistAgreementResp = await dispatch(
        songApi.endpoints.generateArtistAgreement.initiate(body)
      );

      if ("error" in artistAgreementResp) return;

      callback();
    } catch (err) {
      // do nothing
    } finally {
      dispatch(setSongIsLoading(false));
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
      // set loading state to show loading indicator
      dispatch(setSongIsLoading(true));

      let coverArtUrl;

      if (body.image) {
        // TODO: Delete previously saved image from cloudinary after successfully updating it.

        // optional upload params to format or crop image could go here
        const uploadParams = {};

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
    } finally {
      // done fetching songs
      dispatch(setSongIsLoading(false));
    }
  }
);
