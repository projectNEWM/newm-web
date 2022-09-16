import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrls } from "buildParams";

const api = createApi({
  reducerPath: "phyrhoseApi",
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: baseUrls.phyrhose }),
  endpoints: () => ({}),
});

export default api;
