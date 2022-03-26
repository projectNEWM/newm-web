import api from "api";
import { GoogleAuthBody, GoogleAuthResponse } from "./types";

export const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    googleLogin: build.mutation<GoogleAuthResponse, GoogleAuthBody>({
      query: (body) => ({
        url: "login/google",
        method: "POST",
        body,
      }),
    }),
  }),
});

export default extendedApi;
