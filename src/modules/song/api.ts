import api, { CloudinaryUploadParams } from "api";
import { setToastMessage } from "modules/ui";
import {
  AudioUploadUrlRequest,
  AudioUploadUrlResponse,
  CloudinarySignatureResponse,
  GetSongsResponse,
  UploadSongRequest,
  UploadSongResponse,
} from "./types";

export const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSongs: build.query<GetSongsResponse, void>({
      query: () => "v1/songs",

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch ({ error }) {
          dispatch(
            setToastMessage({
              message: "An error occured while fetching songs",
              severity: "error",
            })
          );
        }
      },
    }),
    uploadSong: build.mutation<UploadSongResponse, UploadSongRequest>({
      query: (body) => ({
        url: "v1/songs",
        method: "POST",
        body,
      }),

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch ({ error }) {
          dispatch(
            setToastMessage({
              message: "An error occured while uploading your song",
              severity: "error",
            })
          );
        }
      },
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

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch ({ error }) {
          dispatch(
            setToastMessage({
              message: "An error while uploading your image",
              severity: "error",
            })
          );
        }
      },
    }),
    getAudioUploadUrl: build.mutation<
      AudioUploadUrlResponse,
      AudioUploadUrlRequest
    >({
      query: ({ songId, ...body }) => ({
        url: `/v1/songs/${songId}/upload`,
        method: "POST",
        body,
      }),

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch ({ error }) {
          dispatch(
            setToastMessage({
              message: "An error while uploading your song",
              severity: "error",
            })
          );
        }
      },
    }),
  }),
});

export const { useGetSongsQuery } = extendedApi;

export default extendedApi;
