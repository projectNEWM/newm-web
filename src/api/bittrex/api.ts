import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MarketTickerResp } from "./types";

const api = createApi({
  reducerPath: "bittrexApi",
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.bittrex.com/v3/" }),
  endpoints: (build) => ({
    getMarketTicker: build.mutation<MarketTickerResp, string>({
      query: (symbol) => ({
        url: `markets/${symbol}/ticker`,
        method: "GET",
      }),
    }),
  }),
});

export default api;
