import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "phyrhoseApi",
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: "https://testnet.phyrhose.io/" }),
  endpoints: () => ({}),
});

export default api;
