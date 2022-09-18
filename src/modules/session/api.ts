import api from "api";
import { EmptyResponse } from "common";
import { setToastMessage } from "modules/ui";
import {
  CreateAccountRequest,
  GetProfileResponse,
  LoginRequest,
  NewmAuthResponse,
  NewmOAuthRequest,
  Request2FACode,
  UpdateProfileRequest,
} from "./types";
import { handleSocialLoginError } from "./thunks";
import { receiveProfile, receiveSuccessfullAuthentication } from "./slice";

const extendedApi = api.injectEndpoints({
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
            "error" in resp && resp.error?.status === 403
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
        } catch ({ error }) {
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
        } catch ({ error }) {
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
        } catch ({ error }) {
          dispatch(handleSocialLoginError(error));
        }
      },
    }),

    getProfile: build.query<GetProfileResponse, void>({
      query: () => ({
        url: "v1/users/me",
        method: "GET",
      }),

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(receiveProfile(data));
        } catch ({ error }) {
          dispatch(
            setToastMessage({
              message: "There was an error fetching your profile data",
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

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(receiveProfile(data));
        } catch ({ error }) {
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
        } catch ({ error }) {
          dispatch(
            setToastMessage({
              message: "An error occured while sending the verification email",
              severity: "error",
            })
          );
        }
      },
    }),

    createAccount: build.mutation<EmptyResponse, CreateAccountRequest>({
      query: (body) => ({
        url: "v1/users",
        method: "PUT",
        body,
      }),

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch ({ error }) {
          dispatch(
            setToastMessage({
              message: "An error occured while creating your account",
              severity: "error",
            })
          );
        }
      },
    }),
  }),
});

export default extendedApi;
