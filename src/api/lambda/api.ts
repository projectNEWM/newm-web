import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrls } from "buildParams";
import { prepareNewmAuthHeader } from "common/apiUtils";
import { setToastMessage } from "modules/ui";
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
        url: "generate-artist-agreement/",
        method: "POST",
        body,
      }),

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occured while fetching your artist agreement",
              severity: "error",
            })
          );
        }
      },
    }),
  }),
});

export default api;
