import { isProd } from "@newm-web/env";
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
          // eslint-disable-next-line
          console.log(
            "TEMP: ",
            isProd,
            process.env["NODE" + "_ENV"],
            process.env.NEXT_PUBLIC_ENV
          );
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
