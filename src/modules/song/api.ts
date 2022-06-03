import api from "api";
import { CloudinaryUploadParams } from "cloudinaryApi";
import {
  CloudinarySignatureResponse,
  GetSongsResponse,
  UploadSongRequest,
  UploadSongResponse,
} from "./types";

export const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSongs: build.query<GetSongsResponse, void>({
      query: () => "v1/songs",
    }),
    uploadSong: build.mutation<UploadSongResponse, UploadSongRequest>({
      query: (body) => ({
        url: "v1/songs",
        method: "POST",
        body,
      }),
    }),
    getCloudinarySignature: build.mutation<
      CloudinarySignatureResponse,
      CloudinaryUploadParams
    >({
      query: (body) => ({
        url: "v1/cloudinary/sign",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetSongsQuery } = extendedApi;

export default extendedApi;
