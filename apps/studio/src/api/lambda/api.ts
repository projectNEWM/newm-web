import { createApi } from "@reduxjs/toolkit/query/react";
import { baseUrls } from "@newm.io/studio/buildParams";
import { setToastMessage } from "@newm.io/studio/modules/ui";
import {
  GenerateArtistAgreementBody,
  GenerateArtistAgreementResponse,
} from "./types";
import { baseQuery as newmBaseQuery } from "../newm/api";
import {
  axiosBaseQuery,
  fetchBaseQueryWithReauth,
  prepareAuthHeader,
} from "../utils";

const baseQuery = axiosBaseQuery({
  baseUrl: baseUrls.lambda,
  prepareHeaders: prepareAuthHeader,
});

const api = createApi({
  reducerPath: "lambdaApi",
  baseQuery: fetchBaseQueryWithReauth(baseQuery, newmBaseQuery),
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
              message: "An error occurred while fetching your artist agreement",
              severity: "error",
            })
          );
        }
      },
    }),
  }),
});

export default api;
