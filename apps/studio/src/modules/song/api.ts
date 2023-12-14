import { newmApi, CloudinaryUploadOptions, Tags } from "../../api";
import { setToastMessage } from "../../modules/ui";
import { CustomError, EmptyResponse } from "@newm-web/utils";
import {
  CborHexResponse,
  CloudinarySignatureResponse,
  CreateCollaborationRequest,
  CreateCollaborationResponse,
  CreateMintSongPaymentRequest,
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
  MarketplaceStatus,
  MintingStatus,
  PatchSongRequest,
  PostSongRequest,
  ProcessStreamTokenAgreementRequest,
  ReplyCollaborationRequest,
  Song,
  SubmitTransactionRequest,
  UpdateCollaborationRequest,
  UploadSongAudioRequest,
  UploadSongAudioResponse,
  UploadSongResponse,
} from "./types";
import { getApiErrorStatus } from "../../api/utils";

export const emptySong: Song = {
  archived: true,
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
  mintingStatus: MintingStatus.Pending,
  marketplaceStatus: MarketplaceStatus.NotSelling,
  lyricsUrl: "",
  album: "",
  language: "",
  compositionCopyrightYear: "",
  compositionCopyrightOwner: "",
  phonographicCopyrightYear: "",
  phonographicCopyrightOwner: "",
  parentalAdvisory: "",
  isrc: "",
  iswc: "",
  ipis: [],
  releaseDate: "",
  publicationDate: "",
  coverRemixSample: false,
};

export const extendedApi = newmApi.injectEndpoints({
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
              message: "An error occurred while fetching song info",
              severity: "error",
            })
          );
        }
      },
    }),
    getSongStream: build.query<GetSongStreamResponse, Song>({
      query: (song) => ({
        url: `v1/songs/${song.id}/stream`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: [Tags.Song],

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
    }),
    getSongs: build.query<GetSongsResponse, GetSongsRequest>({
      query: (params) => {
        const { genres, ids, ownerIds, mintingStatuses, ...restOfParams } =
          params;

        return {
          url: "v1/songs",
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
        };
      },
      providesTags: [Tags.Song],

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
    }),
    getSongCount: build.query<GetSongCountResponse, GetSongCountRequest>({
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
          url: "v1/songs/count",
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
        };
      },
      providesTags: [Tags.Song],

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
    }),
    uploadSong: build.mutation<UploadSongResponse, PostSongRequest>({
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
              message: "An error occurred while uploading your song",
              severity: "error",
            })
          );
        }
      },
    }),
    uploadSongAudio: build.mutation<
      UploadSongAudioResponse,
      UploadSongAudioRequest
    >({
      query: ({ onUploadProgress, songId, ...body }) => ({
        url: `v1/songs/${songId}/audio`,
        method: "POST",
        body: body.audio,
        onUploadProgress,
      }),
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
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while updating your song",
              severity: "error",
            })
          );
        }
      },
    }),
    deleteSong: build.mutation<void, DeleteSongRequest>({
      query: ({ songId, archived = true }) => ({
        url: `v1/songs/${songId}`,
        method: "PATCH",
        body: { archived },
      }),
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
    getCollaborations: build.query<
      GetCollaborationsResponse,
      GetCollaborationsRequest
    >({
      query: (params) => {
        const { ids, statuses, ...restOfParams } = params;

        return {
          url: "v1/collaborations",
          method: "GET",
          params: {
            ...restOfParams,
            ...(ids ? { ids: ids.join(",") } : {}),
            ...(statuses ? { statuses: statuses.join(",") } : {}),
          },
        };
      },
      providesTags: [Tags.Collaboration],

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
              message: "An error occurred while adding a collaborator",
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
              message: "An error occurred while updating a collaborator",
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
              message: "An error occurred while removing a collaborator",
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
      query: (params) => {
        const { emails, songIds, ...restOfParams } = params;

        return {
          url: "v1/collaborations/collaborators",
          method: "GET",
          params: {
            ...restOfParams,
            ...(emails ? { emails: emails.join(",") } : {}),
            ...(songIds ? { songIds: songIds.join(",") } : {}),
          },
        };
      },
      providesTags: [Tags.Collaboration],

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
    }),
    getCollaboratorCount: build.query<
      GetCollaboratorCountResponse,
      GetCollaboratorCountRequest
    >({
      query: (params) => {
        const { songIds, ...restOfParams } = params;

        return {
          url: "v1/collaborations/collaborators/count",
          method: "GET",
          params: {
            ...restOfParams,
            ...(songIds ? { songIds: songIds.join(",") } : {}),
          },
        };
      },
      providesTags: [Tags.Collaboration],

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
              message: "An error occurred while replying to a collaboration",
              severity: "error",
            })
          );
        }
      },
    }),
    getMintSongPayment: build.query<CborHexResponse, string>({
      query: (songId) => ({
        url: `v1/songs/${songId}/mint/payment`,
        method: "GET",
        songId,
      }),
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
    }),
    getMintSongEstimate: build.query<
      GetMintSongEstimateResponse,
      GetMintSongEstimateRequest
    >({
      query: (params) => ({
        url: "v1/songs/mint/estimate",
        method: "GET",
        params,
      }),
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
    }),
    createMintSongPayment: build.mutation<
      CborHexResponse,
      CreateMintSongPaymentRequest
    >({
      query: ({ songId, ...body }) => ({
        url: `v1/songs/${songId}/mint/payment`,
        method: "POST",
        body,
      }),

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
    }),
    submitMintSongPayment: build.mutation<void, SubmitTransactionRequest>({
      query: (body) => ({
        url: "v1/cardano/submitTransaction",
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
              message: "An error occurred while fetching your payment",
              severity: "error",
            })
          );
        }
      },
    }),
    getEarliestReleaseDate: build.query<GetEarliestReleaseDateResponse, void>({
      query: () => ({
        url: "v1/distribution/earliest-release-date",
        method: "GET",
      }),

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
    }),
    getUserWalletSongs: build.query<
      GetUserWalletSongsResponse,
      GetUserWalletSongsRequest
    >({
      query: (params) => {
        const { utxoCborHexList, ...restOfParams } = params;

        return {
          url: "v1/cardano/songs",
          method: "POST",
          params: restOfParams,
          body: utxoCborHexList,
        };
      },

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
} = extendedApi;

export default extendedApi;
