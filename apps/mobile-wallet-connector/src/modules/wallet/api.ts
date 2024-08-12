import {
  GetAdaUsdConversionResponse,
  GetNewmUsdConversionResponse,
} from "@newm-web/types";
import {
  AnswerChallengeRequest,
  AnswerChallengeResponse,
  GenerateChallengeRequest,
  GenerateChallengeResponse,
} from "./types";
import { newmApi } from "../../api";
import { setToastMessage } from "../../modules/ui";

export const extendedApi = newmApi.injectEndpoints({
  endpoints: (build) => ({
    answerChallenge: build.mutation<
      AnswerChallengeResponse,
      AnswerChallengeRequest
    >({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message:
                "An error occurred while answering the wallet connection challenge",
              severity: "error",
            })
          );
        }
      },

      query: (body) => ({
        body,
        method: "POST",
        url: "v1/wallet-connections/challenges/answer",
      }),
    }),
    generateChallenge: build.mutation<
      GenerateChallengeResponse,
      GenerateChallengeRequest
    >({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message:
                "An error occurred while generating a wallet connection challenge",
              severity: "error",
            })
          );
        }
      },

      query: (body) => ({
        body,
        method: "POST",
        url: "v1/wallet-connections/challenges/generate",
      }),
    }),
    getAdaUsdConversionRate: build.query<GetAdaUsdConversionResponse, void>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred fetching ADA/USD conversion rate",
              severity: "error",
            })
          );
        }
      },

      query: (body) => ({
        method: "GET",
        url: "/v1/cardano/prices/ada",
      }),
    }),
    getNewmUsdConversionRate: build.query<GetNewmUsdConversionResponse, void>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred fetching NEWM/USD conversion rate",
              severity: "error",
            })
          );
        }
      },

      query: (body) => ({
        method: "GET",
        url: "/v1/cardano/prices/newm",
      }),
    }),
  }),
});

export const {
  useGetAdaUsdConversionRateQuery,
  useGetNewmUsdConversionRateQuery,
} = extendedApi;

export default extendedApi;
