import api, { Tags } from "api";
import { setToastMessage } from "modules/ui";
import {
  CreateMintSongPaymentRequest,
  CreateMintSongPaymentResponse,
} from "./types";

export const walletApi = api.injectEndpoints({
  endpoints: (build) => ({
    createMintSongPayment: build.mutation<
      CreateMintSongPaymentResponse,
      CreateMintSongPaymentRequest
    >({
      query: (body) => ({
        url: "v1/mint/payment",
        method: "POST",
        body,
      }),
      invalidatesTags: [Tags.Wallet],

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occured while submitting your payment",
              severity: "error",
            })
          );
        }
      },
    }),
    getMintSongPayment: build.query<CreateMintSongPaymentResponse, void>({
      query: () => ({
        url: "v1/mint/payment",
        method: "GET",
      }),
      providesTags: [Tags.Wallet],

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occured while fetching your payment",
              severity: "error",
            })
          );
        }
      },
    }),
  }),
});

export const { useCreateMintSongPaymentMutation, useGetMintSongPaymentQuery } =
  walletApi;

export default walletApi;
