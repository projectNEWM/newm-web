import api, { CloudinaryUploadOptions, Tags } from "api";
import { setToastMessage } from "modules/ui";
import {
  AudioUploadUrlRequest,
  AudioUploadUrlResponse,
  CloudinarySignatureResponse,
  GetSongsRequest,
  GetSongsResponse,
  PatchSongRequest,
  Song,
  UploadSongRequest,
  UploadSongResponse,
} from "./types";

export const emptySong: Song = {
  id: "",
  ownerId: "",
  createdAt: "",
  title: "",
  genres: [],
  moods: [],
  coverArtUrl: "",
  description: "",
  credits: "",
  duration: undefined,
  streamUrl: "",
  nftPolicyId: "",
  nftName: "",
  mintingStatus: "",
  marketplaceStatus: "",
};

export const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSong: build.query<Song, string>({
      query: (id) => ({
        url: `v1/songs/${id}`,
        method: "GET",
      }),
      providesTags: [Tags.Song],

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
    getSongs: build.query<GetSongsResponse, GetSongsRequest>({
      query: (params) => ({
        url: "v1/songs",
        method: "GET",
        params,
      }),
      providesTags: [Tags.Song],

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
      invalidatesTags: [Tags.Song],

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
      invalidatesTags: [Tags.Song],

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
      CloudinaryUploadOptions
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
        url: `/v1/songs/${songId}/audio`,
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

export const { useGetSongsQuery, useGetSongQuery } = extendedApi;

export default extendedApi;
