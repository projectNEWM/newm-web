import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrls } from "buildParams";
import { prepareNewmAuthHeader } from "common/apiUtils";
import {
  GenerateArtistAgreementBody,
  GenerateArtistAgreementResponse,
} from "./types";

const api = createApi({
  reducerPath: "lambdaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrls.lambda,
    prepareHeaders: prepareNewmAuthHeader,
  }),
  endpoints: (build) => ({
    generateArtistAgreement: build.mutation<
      GenerateArtistAgreementResponse,
      GenerateArtistAgreementBody
    >({
      query: (body) => ({
        url: "generate-artist-agreement",
        method: "POST",
        body,
      }),
    }),
  }),
});

export default api;
