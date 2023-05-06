import api, { CloudinaryUploadOptions, Tags } from "api";
import { setToastMessage } from "modules/ui";
import {
  AudioUploadUrlRequest,
  AudioUploadUrlResponse,
  CloudinarySignatureResponse,
  CreateCollaborationRequest,
  CreateCollaborationResponse,
  DeleteSongRequest,
  GetCollaborationsRequest,
  GetCollaborationsResponse,
  GetCollaboratorCountRequest,
  GetCollaboratorCountResponse,
  GetCollaboratorsRequest,
  GetCollaboratorsResponse,
  GetSongCountRequest,
  GetSongCountResponse,
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
  mintingStatus: "Pending",
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
        } catch (error) {
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
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occured while fetching songs",
              severity: "error",
            })
          );
        }
      },
    }),
    getSongCount: build.query<GetSongCountResponse, GetSongCountRequest>({
      query: (params) => ({
        url: "v1/songs/count",
        method: "GET",
        params,
      }),
      providesTags: [Tags.Song],

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occured while fetching song count",
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
        } catch (error) {
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
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occured while uploading your song",
              severity: "error",
            })
          );
        }
      },
    }),
    deleteSong: build.mutation<void, DeleteSongRequest>({
      query: ({ songId, ...params }) => ({
        url: `v1/songs/${songId}`,
        method: "DELETE",
        params,
      }),
      invalidatesTags: [Tags.Song],

      async onQueryStarted(_params, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            setToastMessage({
              message: "Successfully deleted song",
              severity: "success",
            })
          );
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occured while deleting your song",
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
        } catch (error) {
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
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error while uploading your song",
              severity: "error",
            })
          );
        }
      },
    }),
    getCollaborations: build.query<
      GetCollaborationsResponse,
      GetCollaborationsRequest
    >({
      query: (params) => ({
        url: "v1/collaborations",
        method: "GET",
        params,
      }),
      providesTags: [Tags.Collaboration],

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occured while fetching collaborators",
              severity: "error",
            })
          );
        }
      },
    }),
    createCollaboration: build.mutation<
      CreateCollaborationResponse,
      CreateCollaborationRequest
    >({
      query: (body) => ({
        url: "v1/collaborations",
        method: "POST",
        body,
      }),
      invalidatesTags: [Tags.Collaboration],

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occured while adding a collaborator",
              severity: "error",
            })
          );
        }
      },
    }),
    getCollaborators: build.query<
      GetCollaboratorsResponse,
      GetCollaboratorsRequest
    >({
      query: (params) => ({
        url: "v1/collaborations/collaborators",
        method: "GET",
        params,
      }),
      providesTags: [Tags.Collaborator],

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occured while fetching collaborators",
              severity: "error",
            })
          );
        }
      },
    }),
    getCollaboratorCount: build.query<
      GetCollaboratorCountResponse,
      GetCollaboratorCountRequest
    >({
      query: (params) => ({
        url: "v1/collaborations/collaborators/count",
        method: "GET",
        params,
      }),
      providesTags: [Tags.Collaborator],

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occured while fetching collaborator count",
              severity: "error",
            })
          );
        }
      },
    }),
  }),
});

export const {
  useGetCollaborationsQuery,
  useGetCollaboratorCountQuery,
  useGetCollaboratorsQuery,
  useGetSongCountQuery,
  useGetSongQuery,
  useGetSongsQuery,
} = extendedApi;

export default extendedApi;
