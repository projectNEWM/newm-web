import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SaleBundlesResp } from "./types";

const api = createApi({
  reducerPath: "phyrhoseApi",
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: "https://testnet.phyrhose.io/" }),
  endpoints: (build) => ({
    getSaleBundles: build.mutation<SaleBundlesResp, string>({
      query: (projectId) => ({
        url: `firehose/ftSaleBundles?projectId=${projectId}`,
        method: "GET",
      }),
    }),
  }),
});

export default api;
