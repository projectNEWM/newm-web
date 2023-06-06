import api, { CloudinaryUploadOptions, Tags } from "api";
import { setToastMessage } from "modules/ui";
import { EmptyResponse } from "common";
import {
  AudioUploadUrlRequest,
  AudioUploadUrlResponse,
  CloudinarySignatureResponse,
  CreateCollaborationRequest,
  CreateCollaborationResponse,
  CreateMintSongPaymentRequest,
  CreateMintSongPaymentResponse,
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
  MarketplaceStatus,
  PatchSongRequest,
  ProcessStreamTokenAgreementRequest,
  ReplyCollaborationRequest,
  Song,
  UpdateCollaborationRequest,
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
  duration: undefined,
  streamUrl: "",
  nftPolicyId: "",
  nftName: "",
  mintingStatus: "Pending",
  marketplaceStatus: MarketplaceStatus.NotSelling,
  lyricsUrl: "",
  album: "",
  language: "",
  copyrights: "",
  parentalAdvisory: "",
  isrc: "",
  iswc: "",
  ipis: "",
  releaseDate: "",
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
    processStreamTokenAgreement: build.mutation<
      EmptyResponse,
      ProcessStreamTokenAgreementRequest
    >({
      query: ({ songId, ...body }) => ({
        url: `v1/songs/${songId}/agreement`,
        method: "PUT",
        body,
      }),

      async onQueryStarted(_body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "There was an error accepting your agreement",
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
              message: "An error occured while fetching collaborations",
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
    updateCollaboration: build.mutation<void, UpdateCollaborationRequest>({
      query: ({ collaborationId, ...body }) => ({
        url: `v1/collaborations/${collaborationId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [Tags.Collaboration],

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occured while updating a collaborator",
              severity: "error",
            })
          );
        }
      },
    }),
    deleteCollaboration: build.mutation<void, string>({
      query: (collaborationId) => ({
        url: `v1/collaborations/${collaborationId}`,
        method: "DELETE",
      }),
      invalidatesTags: [Tags.Collaboration],

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          dispatch(
            setToastMessage({
              message: "An error occured while removing a collaborator",
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
    getCollaboratorCount: build.query<
      GetCollaboratorCountResponse,
      GetCollaboratorCountRequest
    >({
      query: (params) => ({
        url: "v1/collaborations/collaborators/count",
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
              message: "An error occured while fetching collaborator count",
              severity: "error",
            })
          );
        }
      },
    }),
    replyToCollaboration: build.mutation<void, ReplyCollaborationRequest>({
      query: ({ collaborationId, ...body }) => ({
        url: `v1/collaborations/${collaborationId}/reply`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [Tags.Collaboration],

      async onQueryStarted({ accepted }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            setToastMessage({
              message: `${accepted ? "Accepted" : "Declined"} collaboration`,
              severity: "success",
            })
          );
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occured while replying to a collaboration",
              severity: "error",
            })
          );
        }
      },
    }),
    createMintSongPayment: build.mutation<
      CreateMintSongPaymentResponse,
      CreateMintSongPaymentRequest
    >({
      query: ({ songId, ...body }) => ({
        url: `v1/songs/${songId}/mint/payment`,
        method: "POST",
        body,
      }),
      invalidatesTags: [Tags.Wallet],

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occured while submitting your payment",
              severity: "error",
            })
          );
        }
      },
    }),
    getMintSongPayment: build.query<CreateMintSongPaymentResponse, void>({
      query: () => ({
        url: "v1/mint/payment",
        method: "GET",
      }),
      providesTags: [Tags.Wallet],

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occured while fetching your payment",
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
  useDeleteCollaborationMutation,
  useGetCollaboratorCountQuery,
  useGetCollaboratorsQuery,
  useGetSongCountQuery,
  useGetSongQuery,
  useGetSongsQuery,
  useCreateMintSongPaymentMutation,
  useGetMintSongPaymentQuery,
} = extendedApi;

export default extendedApi;
