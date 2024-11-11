import {
  GetAdaUsdConversionResponse,
  GetEarningsResponse,
  GetNewmUsdConversionResponse,
  PostEarningsRequest,
  PostEarningsResponse,
} from "@newm-web/types";
import { Tags, newmApi } from "../../api";
import { setToastMessage } from "../../modules/ui";

export const extendedApi = newmApi.injectEndpoints({
  endpoints: (build) => ({
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

export const {
  useGetEarningsQuery,
  usePostEarningsMutation,
  useGetAdaUsdConversionRateQuery,
  useGetNewmUsdConversionRateQuery,
} = extendedApi;

export default extendedApi;
