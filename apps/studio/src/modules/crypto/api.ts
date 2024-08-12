import {
  GetAdaUsdConversionResponse,
  GetNewmUsdConversionResponse,
} from "@newm-web/types";
import { newmApi } from "../../api";
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

      query: () => ({
        method: "GET",
        url: "v1/cardano/prices/ada",
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

      query: () => ({
        method: "GET",
        url: "v1/cardano/prices/newm",
      }),
    }),
  }),
});

export const {
  useGetAdaUsdConversionRateQuery,
  useGetNewmUsdConversionRateQuery,
} = extendedApi;

export default extendedApi;
