import { CustomError, EmptyResponse } from "@newm-web/utils";
import {
  ChangePasswordRequest,
  CreateAccountRequest,
  CreateAccountResponse,
  DeleteAccountRequest,
  GetProfileResponse,
  GetUserRequest,
  IdenfyTokenResponse,
  LoginRequest,
  NewmAuthResponse,
  NewmOAuthRequest,
  Profile,
  Request2FACode,
  ResetPasswordRequest,
  UpdateProfileRequest,
  VerificationStatus,
} from "./types";
import { handleSocialLoginError } from "./thunks";
import { receiveSuccessfullAuthentication } from "./slice";
import { setToastMessage } from "../../modules/ui";
import { Tags, newmApi } from "../../api";

export const emptyProfile: Profile = {
  appleMusicProfile: "",
  bannerUrl: "",
  biography: "",
  companyIpRights: false,
  companyLogoUrl: "",
  companyName: "",
  dspPlanSubscribed: false,
  email: "",
  firstName: "",
  id: "",
  instagramUrl: "",
  ipi: "",
  isni: "",
  lastName: "",
  location: "",
  nickname: "",
  oauthId: "",
  oauthType: "",
  pictureUrl: "",
  role: "",
  soundCloudProfile: "",
  spotifyProfile: "",
  twitterUrl: "",
  verificationStatus: VerificationStatus.Unverified,
  walletAddress: "",
  websiteUrl: "",
};

export const extendedApi = newmApi.injectEndpoints({
  endpoints: (build) => ({
    appleLogin: build.mutation<NewmAuthResponse, NewmOAuthRequest>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(receiveSuccessfullAuthentication(data));
        } catch (error) {
          dispatch(handleSocialLoginError(error));
        }
      },

      query: (body) => {
        const { referrer, ...bodyData } = body;

        return {
          body: bodyData,
          method: "POST",
          params: referrer ? { referrer: referrer } : undefined,
          url: "v1/auth/login/apple",
        };
      },
    }),

    changePassword: build.mutation<EmptyResponse, ChangePasswordRequest>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while changing your password",
              severity: "error",
            })
          );
        }
      },

      query: (body) => ({
        body,
        method: "PATCH",
        url: "v1/users/me",
      }),
    }),

    createAccount: build.mutation<CreateAccountResponse, CreateAccountRequest>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while creating your account",
              severity: "error",
            })
          );
        }
      },

      query: (body) => {
        const { referrer, ...bodyData } = body;

        return {
          body: bodyData,
          method: "POST",
          params: referrer ? { referrer: referrer } : undefined,
          url: "v1/users",
        };
      },
    }),

    deleteAccount: build.mutation<EmptyResponse, DeleteAccountRequest>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while deleting your account",
              severity: "error",
            })
          );
        }
      },

      query: (body) => ({
        body,
        method: "DELETE",
        url: "v1/users/me",
      }),
    }),

    getIdenfyAuthToken: build.query<IdenfyTokenResponse, void>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message:
                "There was an error creating an auth token, try again later.",
              severity: "error",
            })
          );
        }
      },

      query: () => ({
        method: "GET",
        url: "v1/idenfy/session",
      }),
    }),

    getProfile: build.query<GetProfileResponse, void>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "There was an error fetching your profile data",
              severity: "error",
            })
          );
        }
      },
      providesTags: [Tags.Profile],

      query: () => ({
        method: "GET",
        url: "v1/users/me",
      }),
    }),
    getUser: build.query<GetProfileResponse, GetUserRequest>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "There was an error fetching requested profile",
              severity: "error",
            })
          );
        }
      },

      query: ({ userId }) => ({
        method: "GET",
        url: `v1/users/${userId}`,
      }),
    }),
    googleLogin: build.mutation<NewmAuthResponse, NewmOAuthRequest>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(receiveSuccessfullAuthentication(data));
        } catch (error) {
          dispatch(handleSocialLoginError(error));
        }
      },

      query: (body) => {
        const { referrer, ...bodyData } = body;

        return {
          body: bodyData,
          method: "POST",
          params: referrer ? { referrer: referrer } : undefined,
          url: "v1/auth/login/google",
        };
      },
    }),

    login: build.mutation<NewmAuthResponse, LoginRequest>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(receiveSuccessfullAuthentication(data));
          // eslint-disable-next-line
        } catch (resp: any) {
          const errorMessage =
            ("error" in resp && resp.error?.status === 403) ||
            resp.error?.status === 404
              ? "Invalid username or password"
              : "An error occurred while logging in";

          dispatch(
            setToastMessage({
              message: errorMessage,
              severity: "error",
            })
          );
        }
      },

      query: (body) => ({
        body,
        method: "POST",
        url: "v1/auth/login",
      }),
    }),

    resetPassword: build.mutation<EmptyResponse, ResetPasswordRequest>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while resetting your password",
              severity: "error",
            })
          );
        }
      },

      query: (body) => ({
        body,
        method: "PUT",
        url: "v1/users/password",
      }),
    }),

    sendVerificationEmail: build.query<EmptyResponse, Request2FACode>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while sending the verification email",
              severity: "error",
            })
          );
        }
      },

      query: ({ email, mustExists }) => ({
        method: "GET",
        params: { email, mustExists },
        url: "v1/auth/code",
      }),
    }),

    updateProfile: build.mutation<EmptyResponse, UpdateProfileRequest>({
      invalidatesTags: [Tags.Profile],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          let message = "There was an error updating your profile";

          const customError = error as CustomError;

          if (customError.error?.data?.cause) {
            message = customError.error.data.cause;
          }

          dispatch(
            setToastMessage({
              message,
              severity: "error",
            })
          );
        }
      },

      query: (body) => ({
        body,
        method: "PATCH",
        url: "v1/users/me",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = extendedApi;

export default extendedApi;
