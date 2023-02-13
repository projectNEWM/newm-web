import api, { CloudinaryUploadParams, lambdaApi } from "api";
import { mergeApis } from "common/apiUtils";
import { setToastMessage } from "modules/ui";
import {
  AudioUploadUrlRequest,
  AudioUploadUrlResponse,
  CloudinarySignatureResponse,
  GenerateArtistAgreementBody,
  GenerateArtistAgreementResponse,
  GetSongsResponse,
  PatchSongRequest,
  Song,
  UploadSongRequest,
  UploadSongResponse,
} from "./types";

const extendedNewmApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSong: build.query<Song, string>({
      query: (id) => ({
        url: `v1/songs/${id}`,
        method: "GET",
      }),

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch ({ error }) {
          dispatch(
            setToastMessage({
              message: "An error occured while fetching song info",
              severity: "error",
            })
          );
        }
      },
    }),
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
    patchSong: build.mutation<void, PatchSongRequest>({
      query: ({ id, ...body }) => ({
        url: `v1/songs/${id}`,
        method: "PATCH",
        body,
      }),

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            setToastMessage({
              message: "Updated song information",
              severity: "success",
            })
          );
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

const extendedLambdaApi = lambdaApi.injectEndpoints({
  endpoints: (build) => ({
    generateArtistAgreement: build.mutation<
      GenerateArtistAgreementResponse,
      GenerateArtistAgreementBody
    >({
      query: (body) => ({
        url: "generate-artist-agreement/",
        method: "POST",
        body,
      }),

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch ({ error }) {
          dispatch(
            setToastMessage({
              message: "An error occured while fetching your artist agreement",
              severity: "error",
            })
          );
        }
      },
    }),
  }),
});

export const extendedApi = mergeApis(extendedNewmApi, extendedLambdaApi);

export const { useGetSongsQuery, useGetSongQuery } = extendedApi;
