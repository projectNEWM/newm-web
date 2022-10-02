import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrls } from "buildParams";
import { receiveAdaUsdRate } from "modules/wallet/slice";
import { AdaUsdResponse } from "./types";

const api = createApi({
  reducerPath: "binanceApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrls.binance }),
  endpoints: (build) => ({
    getAdaUsdRate: build.query<AdaUsdResponse, void>({
      query: () => ({
        url: "v3/avgPrice?symbol=ADAUSDT",
        method: "GET",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(receiveAdaUsdRate(data.price));
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export default api;
