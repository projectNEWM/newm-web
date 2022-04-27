import api from "api";
import { EmptyResponse } from "common";
import {
  CreateAccountRequest,
  GetProfileResponse,
  LoginRequest,
  NewmAuthResponse,
  NewmOAuthRequest,
  Request2FACode,
  UpdateProfileRequest
} from "./types";

export const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<NewmAuthResponse, LoginRequest>({
      query: (body) => ({
        url: "v1/auth/login",
        method: "POST",
        body,
      }),
    }),

    googleLogin: build.mutation<NewmAuthResponse, NewmOAuthRequest>({
      query: (body) => ({
        url: "v1/auth/login/google",
        method: "POST",
        body,
      }),
    }),

    facebookLogin: build.mutation<NewmAuthResponse, NewmOAuthRequest>({
      query: (body) => ({
        url: "v1/auth/login/facebook",
        method: "POST",
        body,
      }),
    }),

    linkedInLogin: build.mutation<NewmAuthResponse, NewmOAuthRequest>({
      query: (body) => ({
        url: "v1/auth/login/linkedin",
        method: "POST",
        body,
      }),
    }),

    refreshToken: build.query<NewmAuthResponse, string>({
      query: (refreshToken) => ({
        url: "/v1/auth/refresh",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }),
    }),

    getProfile: build.query<GetProfileResponse, void>({
      query: () => ({
        url: "v1/users/me",
        method: "GET",
      }),
    }),

    updateProfile: build.mutation<EmptyResponse, UpdateProfileRequest>({
      query: (body) => ({
        url: "v1/users/me",
        method: "PATCH",
        body,
      }),
    }),

    sendVerificationEmail: build.query<EmptyResponse, Request2FACode>({
      query: () => ({
        url: "v1/auth/code",
        method: "GET",
      }),
    }),

    createAccount: build.mutation<EmptyResponse, CreateAccountRequest>({
      query: (body) => ({
        url: "v1/users",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export default extendedApi;
