import api from "api";
import { LoginRequest, NewmAuthResponse, NewmOAuthRequest } from "./types";

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
  }),
});

export default extendedApi;
