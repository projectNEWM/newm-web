import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@newm-web/utils";
import {
  GenerateArtistAgreementBody,
  GenerateArtistAgreementResponse,
} from "./types";
import { baseUrls } from "../../buildParams";
import { setToastMessage } from "../../modules/ui";
import { baseQuery as newmBaseQuery } from "../newm/api";
import { fetchBaseQueryWithReauth, prepareHeaders } from "../utils";

const baseQuery = axiosBaseQuery({
  baseUrl: baseUrls.lambda,
  prepareHeaders: (api, headers) => prepareHeaders(api, headers, false),
});

const api = createApi({
  baseQuery: fetchBaseQueryWithReauth(baseQuery, newmBaseQuery),
  endpoints: (build) => ({
    generateArtistAgreement: build.mutation<
      GenerateArtistAgreementResponse,
      GenerateArtistAgreementBody
    >({
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

      query: (body) => ({
        body,
        method: "POST",
        url: "generate-artist-agreement/",
      }),
    }),
  }),
  reducerPath: "lambdaApi",
});

export default api;
