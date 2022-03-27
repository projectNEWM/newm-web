import api from "api";
import { NewmAuthRequest, NewmAuthResponse } from "./types";

export const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    googleLogin: build.mutation<NewmAuthResponse, NewmAuthRequest>({
      query: (body) => ({
        url: "login/google",
        method: "POST",
        body,
      }),
    }),
    facebookLogin: build.mutation<NewmAuthResponse, NewmAuthRequest>({
      query: (body) => ({
        url: "login/facebook",
        method: "POST",
        body,
      }),
    }),
    linkedInLogin: build.mutation<NewmAuthResponse, NewmAuthRequest>({
      query: (body) => ({
        url: "login/linkedin",
        method: "POST",
        body,
      }),
    }),
  }),
});

export default extendedApi;
