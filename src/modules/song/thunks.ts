import { createAsyncThunk } from "@reduxjs/toolkit";
import cloudinaryApi from "cloudinaryApi";
import { UploadSongFormValues } from "./types";
import { extendedApi as songApi } from "./api";

/**
 * Retreive a Cloudinary signature, use the signature to upload
 * the album cover art image to Cloudinary, upload the song to AWS,
 * then save the song in the NEWM back-end with the file url information.
 */
export const uploadSong = createAsyncThunk(
  "song/uploadSong",
  async (body: UploadSongFormValues, thunkApi) => {
    // optional upload params to format or crop image could go here
    const uploadParams = {};

    const signatureResp = await thunkApi.dispatch(
      songApi.endpoints.getCloudinarySignature.initiate(uploadParams)
    );

    if ("error" in signatureResp || !("data" in signatureResp)) return;

    const { apiKey, signature, timestamp } = signatureResp.data;

    // create a base64 binary string representation of the file
    const binaryStr = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const binaryStr = reader.result;
        resolve(binaryStr);
      };

      reader.readAsDataURL(body.image);
    });

    const cloudinaryResp = await thunkApi.dispatch(
      cloudinaryApi.endpoints.uploadImage.initiate({
        api_key: apiKey,
        file: binaryStr,
        signature,
        timestamp,
        ...uploadParams,
      })
    );

    if ("error" in cloudinaryResp || !("data" in cloudinaryResp)) return;

    const songResp = await thunkApi.dispatch(
      songApi.endpoints.uploadSong.initiate({
        title: body.title,
        genre: body.genre,
        description: body.description,
        covertArtUrl: cloudinaryResp.data.secure_url,
      })
    );

    if ("error" in songResp) return;

    thunkApi.dispatch(songApi.endpoints.getSongs.initiate());
  }
);
