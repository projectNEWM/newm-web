import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrls } from "buildParams";
import { setToastMessage } from "modules/ui";
import { receiveAdaUsdRate } from "modules/wallet/slice";
import { AdaUsdResponse } from "./types";

const api = createApi({
  reducerPath: "coinGeckoApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrls.coinGecko }),
  endpoints: () => ({}),
});

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAdaUsdRate: build.query<AdaUsdResponse, void>({
      query: () => ({
        url: "v3/simple/price?ids=cardano&vs_currencies=usd",
        method: "GET",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(receiveAdaUsdRate(data.cardano.usd));
        } catch (err) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching ADA price data",
              severity: "error",
            })
          );
        }
      },
    }),
  }),
});

export default extendedApi;
