import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrls } from "buildParams";
import { receiveAdaUsdRate } from "modules/wallet/slice";
import { AdaUsdResponse } from "./types";

const api = createApi({
  reducerPath: "coinGeckoApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrls.coinGecko }),
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
          // do nothing
        }
      },
    }),
  }),
});

export default api;
