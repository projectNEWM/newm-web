import {
  AnswerChallengeRequest,
  AnswerChallengeResponse,
  GenerateChallengeRequest,
  GenerateChallengeResponse,
  GetQRCodeRequest,
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
    getQRCode: build.query<Blob, GetQRCodeRequest>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while getting the QR code",
              severity: "error",
            })
          );
        }
      },
      query: ({ connectionId }) => ({
        headers: {
          Accept: "image/any",
        },
        method: "GET",
        transformResponse: async (response: Response) => await response.blob(),
        url: `v1/wallet-connections/${connectionId}/qrcode`,
      }),
    }),
  }),
});

export const { useGetQRCodeQuery } = extendedApi;

export default extendedApi;
