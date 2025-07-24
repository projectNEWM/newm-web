import { CustomError, EmptyResponse } from "@newm-web/utils";
import { MarketplaceStatus, MintingStatus, Song } from "@newm-web/types";
import {
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
  GetEarliestReleaseDateResponse,
  GetMintSongEstimateRequest,
  GetMintSongEstimateResponse,
  GetSongCountRequest,
  GetSongCountResponse,
  GetSongStreamData,
  GetSongStreamResponse,
  GetSongsRequest,
  GetSongsResponse,
  GetUserWalletSongsRequest,
  GetUserWalletSongsResponse,
  PatchSongRequest,
  PostSongRequest,
  ProcessStreamTokenAgreementRequest,
  ReplyCollaborationRequest,
  SubmitTransactionRequest,
  UpdateCollaborationRequest,
  UploadSongAudioRequest,
  UploadSongAudioResponse,
  UploadSongResponse,
  getMintSongPaymentRequest,
  getMintSongPaymentResponse,
} from "./types";
import { CloudinaryUploadOptions, Tags, newmApi } from "../../api";
import { setToastMessage } from "../../modules/ui";
import { getApiErrorStatus } from "../../api/utils";

export const emptySong: Song = {
  album: "",
  archived: true,
  compositionCopyrightOwner: "",
  compositionCopyrightYear: "",
  coverArtUrl: "",
  coverRemixSample: false,
  createdAt: "",
  description: "",
  duration: undefined,
  genres: [],
  id: "",
  instrumental: false,
  ipis: [],
  isrc: "",
  iswc: "",
  language: "",
  lyricsUrl: "",
  marketplaceStatus: MarketplaceStatus.NotSelling,
  mintingStatus: MintingStatus.Pending,
  moods: [],
  nftName: "",
  nftPolicyId: "",
  ownerId: "",
  parentalAdvisory: "",
  phonographicCopyrightOwner: "",
  phonographicCopyrightYear: "",
  publicationDate: "",
  releaseDate: "",
  streamUrl: "",
  title: "",
};

export const extendedApi = newmApi.injectEndpoints({
  endpoints: (build) => ({
    createCollaboration: build.mutation<
      CreateCollaborationResponse,
      CreateCollaborationRequest
    >({
      invalidatesTags: [Tags.Collaboration],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while adding a collaborator",
              severity: "error",
            })
          );
        }
      },

      query: (body) => ({
        body,
        method: "POST",
        url: "v1/collaborations",
      }),
    }),
    createMintSongPayment: build.mutation<
      CreateMintSongPaymentResponse,
      CreateMintSongPaymentRequest
    >({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          const status = getApiErrorStatus(error);
          const message =
            status === 402
              ? "Please add funds to your wallet and try again"
              : "An error occurred while submitting your payment";

          dispatch(
            setToastMessage({
              message,
              severity: "error",
            })
          );
        }
      },

      query: ({ songId, ...body }) => ({
        body,
        method: "POST",
        url: `v1/songs/${songId}/mint/payment`,
      }),
    }),
    deleteCollaboration: build.mutation<void, string>({
      invalidatesTags: [Tags.Collaboration],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          dispatch(
            setToastMessage({
              message: "An error occurred while removing a collaborator",
              severity: "error",
            })
          );
        }
      },

      query: (collaborationId) => ({
        method: "DELETE",
        url: `v1/collaborations/${collaborationId}`,
      }),
    }),
    deleteSong: build.mutation<void, DeleteSongRequest>({
      invalidatesTags: [Tags.Song],
      async onQueryStarted({ showToast = true }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          if (showToast) {
            dispatch(
              setToastMessage({
                message: "Successfully deleted song",
                severity: "success",
              })
            );
          }
        } catch (error) {
          if (showToast) {
            dispatch(
              setToastMessage({
                message: "An error occurred while deleting your song",
                severity: "error",
              })
            );
          }
        }
      },

      query: ({ songId, archived = true }) => ({
        body: { archived },
        method: "PATCH",
        url: `v1/songs/${songId}`,
      }),
    }),
    getCloudinarySignature: build.mutation<
      CloudinarySignatureResponse,
      CloudinaryUploadOptions
    >({
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

      query: (body) => ({
        body,
        method: "POST",
        url: "v1/cloudinary/sign",
      }),
    }),
    getCollaborations: build.query<
      GetCollaborationsResponse,
      GetCollaborationsRequest
    >({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching collaborations",
              severity: "error",
            })
          );
        }
      },
      providesTags: [Tags.Collaboration],

      query: (params) => {
        const { ids, statuses, ...restOfParams } = params;

        return {
          method: "GET",
          params: {
            ...restOfParams,
            ...(ids ? { ids: ids.join(",") } : {}),
            ...(statuses ? { statuses: statuses.join(",") } : {}),
          },
          url: "v1/collaborations",
        };
      },
    }),
    getCollaboratorCount: build.query<
      GetCollaboratorCountResponse,
      GetCollaboratorCountRequest
    >({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching collaborator count",
              severity: "error",
            })
          );
        }
      },
      providesTags: [Tags.Collaboration],

      query: (params) => {
        const { songIds, ...restOfParams } = params;

        return {
          method: "GET",
          params: {
            ...restOfParams,
            ...(songIds ? { songIds: songIds.join(",") } : {}),
          },
          url: "v1/collaborations/collaborators/count",
        };
      },
    }),
    getCollaborators: build.query<
      GetCollaboratorsResponse,
      GetCollaboratorsRequest
    >({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching collaborators",
              severity: "error",
            })
          );
        }
      },
      providesTags: [Tags.Collaboration],

      query: (params) => {
        const { emails, songIds, ...restOfParams } = params;

        return {
          method: "GET",
          params: {
            ...restOfParams,
            ...(emails ? { emails: emails.join(",") } : {}),
            ...(songIds ? { songIds: songIds.join(",") } : {}),
          },
          url: "v1/collaborations/collaborators",
        };
      },
    }),
    getEarliestReleaseDate: build.query<GetEarliestReleaseDateResponse, void>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching earliest release date",
              severity: "error",
            })
          );
        }
      },

      query: () => ({
        method: "GET",
        url: "v1/distribution/earliest-release-date",
      }),
    }),
    getMintSongEstimate: build.query<
      GetMintSongEstimateResponse,
      GetMintSongEstimateRequest
    >({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching your estimate",
              severity: "error",
            })
          );
        }
      },
      query: (params) => ({
        method: "GET",
        params,
        url: "v1/songs/mint/estimate",
      }),
    }),
    getMintSongPayment: build.query<
      getMintSongPaymentResponse,
      getMintSongPaymentRequest
    >({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching your payment",
              severity: "error",
            })
          );
        }
      },
      query: (request) => {
        const { songId, ...params } = request;

        return {
          method: "GET",
          params,
          url: `v1/songs/${songId}/mint/payment`,
        };
      },
    }),
    getSong: build.query<Song, string>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching song info",
              severity: "error",
            })
          );
        }
      },
      providesTags: [Tags.Song],

      query: (id) => ({
        method: "GET",
        url: `v1/songs/${id}`,
      }),
    }),
    getSongCount: build.query<GetSongCountResponse, GetSongCountRequest>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching song count",
              severity: "error",
            })
          );
        }
      },
      providesTags: [Tags.Song],

      query: (params) => {
        const {
          genres,
          ids,
          ownerIds,
          moods,
          mintingStatuses,
          ...restOfParams
        } = params;

        return {
          method: "GET",
          params: {
            ...restOfParams,
            ...(genres ? { genres: genres.join(",") } : {}),
            ...(ids ? { ids: ids.join(",") } : {}),
            ...(ownerIds ? { ownerIds: ownerIds.join(",") } : {}),
            ...(moods ? { moods: moods.join(",") } : {}),
            ...(mintingStatuses
              ? { mintingStatuses: mintingStatuses.join(",") }
              : {}),
          },
          url: "v1/songs/count",
        };
      },
    }),
    getSongStream: build.query<GetSongStreamResponse, Song>({
      async onQueryStarted(song, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching stream info",
              severity: "error",
            })
          );
        }
      },
      providesTags: [Tags.Song],

      query: (song) => ({
        credentials: "include",
        method: "GET",
        url: `v1/songs/${song.id}/stream`,
      }),

      // transform the response to add the song to make it easy to couple the song with the stream info
      transformResponse: (
        value: GetSongStreamData,
        _meta: GetSongStreamData,
        song: Song
      ): GetSongStreamResponse => {
        return {
          song: song,
          streamData: value,
        };
      },
    }),
    getSongs: build.query<GetSongsResponse, GetSongsRequest>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching songs",
              severity: "error",
            })
          );
        }
      },
      providesTags: [Tags.Song],

      query: (params) => {
        const { genres, ids, ownerIds, mintingStatuses, ...restOfParams } =
          params;

        return {
          method: "GET",
          params: {
            ...restOfParams,
            ...(genres ? { genres: genres.join(",") } : {}),
            ...(ids ? { ids: ids.join(",") } : {}),
            ...(ownerIds ? { ownerIds: ownerIds.join(",") } : {}),
            ...(mintingStatuses
              ? { mintingStatuses: mintingStatuses.join(",") }
              : {}),
          },
          url: "v1/songs",
        };
      },
    }),
    getUserWalletSongs: build.query<
      GetUserWalletSongsResponse,
      GetUserWalletSongsRequest
    >({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching songs",
              severity: "error",
            })
          );
        }
      },

      query: (params) => {
        const { utxoCborHexList, ...restOfParams } = params;

        return {
          body: utxoCborHexList,
          method: "POST",
          params: restOfParams,
          url: "v1/cardano/songs",
        };
      },
    }),
    patchSong: build.mutation<void, PatchSongRequest>({
      invalidatesTags: [Tags.Song],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while updating your song",
              severity: "error",
            })
          );
        }
      },

      query: ({ id, ...body }) => ({
        body,
        method: "PATCH",
        url: `v1/songs/${id}`,
      }),
    }),
    processStreamTokenAgreement: build.mutation<
      EmptyResponse,
      ProcessStreamTokenAgreementRequest
    >({
      invalidatesTags: [Tags.Song, Tags.Collaboration],
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

      query: ({ songId, ...body }) => ({
        body,
        method: "PUT",
        url: `v1/songs/${songId}/agreement`,
      }),
    }),
    replyToCollaboration: build.mutation<void, ReplyCollaborationRequest>({
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
              message: "An error occurred while replying to a collaboration",
              severity: "error",
            })
          );
        }
      },

      query: ({ collaborationId, ...body }) => ({
        body,
        method: "PUT",
        url: `v1/collaborations/${collaborationId}/reply`,
      }),
    }),
    reprocessSong: build.query<void, string>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while reprocessing your song",
              severity: "error",
            })
          );
        }
      },
      query: (songId) => ({
        method: "POST",
        url: `v1/songs/${songId}/redistribute`,
      }),
    }),
    submitMintSongPayment: build.mutation<void, SubmitTransactionRequest>({
      invalidatesTags: [Tags.Song],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching your payment",
              severity: "error",
            })
          );
        }
      },

      query: (body) => ({
        body,
        method: "POST",
        url: "v1/cardano/submitTransaction",
      }),
    }),
    updateCollaboration: build.mutation<void, UpdateCollaborationRequest>({
      invalidatesTags: [Tags.Collaboration],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while updating a collaborator",
              severity: "error",
            })
          );
        }
      },

      query: ({ collaborationId, ...body }) => ({
        body,
        method: "PATCH",
        url: `v1/collaborations/${collaborationId}`,
      }),
    }),
    uploadSong: build.mutation<UploadSongResponse, PostSongRequest>({
      invalidatesTags: [Tags.Song],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while uploading your song",
              severity: "error",
            })
          );
        }
      },

      query: (body) => ({
        body,
        method: "POST",
        url: "v1/songs",
      }),
    }),
    uploadSongAudio: build.mutation<
      UploadSongAudioResponse,
      UploadSongAudioRequest
    >({
      invalidatesTags: [Tags.Song],
      async onQueryStarted(_params, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          let message =
            "There was a problem with your audio file, contact support";

          const customError = error as CustomError;

          if (customError.error?.data?.cause) {
            message = customError.error.data.cause;
          }

          dispatch(
            setToastMessage({
              heading: "Bad audio file",
              message,
              severity: "error",
            })
          );
        }
      },

      query: ({ onUploadProgress, songId, ...body }) => ({
        body: body.audio,
        method: "POST",
        onUploadProgress,
        url: `v1/songs/${songId}/audio`,
      }),
    }),
  }),
});

export const {
  useDeleteCollaborationMutation,
  useGetCollaborationsQuery,
  useGetCollaboratorCountQuery,
  useGetCollaboratorsQuery,
  useGetEarliestReleaseDateQuery,
  useGetMintSongEstimateQuery,
  useGetSongCountQuery,
  useGetSongQuery,
  useGetSongStreamQuery,
  useGetSongsQuery,
  useLazyGetSongsQuery,
} = extendedApi;

export default extendedApi;
