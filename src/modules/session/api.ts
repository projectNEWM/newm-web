import api, { Tags } from "api";
import { EmptyResponse } from "common";
import { setToastMessage } from "modules/ui";
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

export const emptyProfile: Profile = {
  id: "",
  oauthId: "",
  oauthType: "",
  email: "",
  firstName: "",
  lastName: "",
  nickname: "",
  location: "",
  pictureUrl: "",
  bannerUrl: "",
  role: "",
  verificationStatus: VerificationStatus.Unverified,
  biography: "",
  instagramUrl: "",
  companyIpRights: false,
  twitterUrl: "",
  websiteUrl: "",
  companyLogoUrl: "",
  companyName: "",
  walletAddress: "",
};

export const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<NewmAuthResponse, LoginRequest>({
      query: (body) => ({
        url: "v1/auth/login",
        method: "POST",
        body,
      }),

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
    }),

    googleLogin: build.mutation<NewmAuthResponse, NewmOAuthRequest>({
      query: (body) => ({
        url: "v1/auth/login/google",
        method: "POST",
        body,
      }),

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(receiveSuccessfullAuthentication(data));
        } catch (error) {
          dispatch(handleSocialLoginError(error));
        }
      },
    }),

    facebookLogin: build.mutation<NewmAuthResponse, NewmOAuthRequest>({
      query: (body) => ({
        url: "v1/auth/login/facebook",
        method: "POST",
        body,
      }),

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(receiveSuccessfullAuthentication(data));
        } catch (error) {
          dispatch(handleSocialLoginError(error));
        }
      },
    }),

    linkedInLogin: build.mutation<NewmAuthResponse, NewmOAuthRequest>({
      query: (body) => ({
        url: "v1/auth/login/linkedin",
        method: "POST",
        body,
      }),

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(receiveSuccessfullAuthentication(data));
        } catch (error) {
          dispatch(handleSocialLoginError(error));
        }
      },
    }),

    getProfile: build.query<GetProfileResponse, void>({
      query: () => ({
        url: "v1/users/me",
        method: "GET",
      }),
      providesTags: [Tags.Profile],

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
    }),

    getUser: build.query<GetProfileResponse, GetUserRequest>({
      query: ({ userId }) => ({
        url: `v1/users/${userId}`,
        method: "GET",
      }),

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
    }),

    updateProfile: build.mutation<EmptyResponse, UpdateProfileRequest>({
      query: (body) => ({
        url: "v1/users/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [Tags.Profile],

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "There was an error updating your profile",
              severity: "error",
            })
          );
        }
      },
    }),

    sendVerificationEmail: build.query<EmptyResponse, Request2FACode>({
      query: ({ email }) => ({
        url: "v1/auth/code",
        method: "GET",
        params: { email },
      }),

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
    }),

    createAccount: build.mutation<CreateAccountResponse, CreateAccountRequest>({
      query: (body) => ({
        url: "v1/users",
        method: "POST",
        body,
      }),

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
    }),

    deleteAccount: build.mutation<EmptyResponse, DeleteAccountRequest>({
      query: (body) => ({
        url: "v1/users/me",
        method: "DELETE",
        body,
      }),

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
    }),

    resetPassword: build.mutation<EmptyResponse, ResetPasswordRequest>({
      query: (body) => ({
        url: "v1/users/password",
        method: "PUT",
        body,
      }),

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
    }),

    changePassword: build.mutation<EmptyResponse, ChangePasswordRequest>({
      query: (body) => ({
        url: "v1/users/me",
        method: "PATCH",
        body,
      }),

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
    }),

    getIdenfyAuthToken: build.query<IdenfyTokenResponse, void>({
      query: () => ({
        url: "/v1/idenfy/session",
        method: "GET",
      }),

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
