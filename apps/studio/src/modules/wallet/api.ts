import {
  GetEarningsResponse,
  PostEarningsRequest,
  PostEarningsResponse,
} from "@newm-web/types";
import { Tags, newmApi } from "../../api";
import { setToastMessage } from "../../modules/ui";

export const extendedApi = newmApi.injectEndpoints({
  endpoints: (build) => ({
    getEarnings: build.query<GetEarningsResponse, string>({
      async onQueryStarted(_walletAddress, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred fetching earnings for your wallet",
              severity: "error",
            })
          );
        }
      },
      providesTags: [Tags.Earnings],

      query: (walletAddress) => ({
        method: "GET",
        url: `v1/earnings/${walletAddress}`,
      }),
    }),

    postEarnings: build.mutation<PostEarningsResponse, PostEarningsRequest>({
      invalidatesTags: [Tags.Earnings],
      async onQueryStarted(_walletAddress, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred claiming earnings for your wallet",
              severity: "error",
            })
          );
        }
      },

      query: (body) => ({
        body,
        method: "POST",
        url: "v1/earnings",
      }),
    }),
  }),
});

export const { useGetEarningsQuery, usePostEarningsMutation } = extendedApi;

export default extendedApi;
