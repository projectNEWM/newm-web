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
  }),
});

export default extendedApi;
