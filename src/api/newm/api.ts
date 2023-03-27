import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrls } from "buildParams";
import { prepareNewmAuthHeader } from "common/apiUtils";
import { fetchBaseQueryWithReauth } from "./utils";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrls.newm,
  prepareHeaders: prepareNewmAuthHeader,
});

const api = createApi({
  reducerPath: "newmApi",
  baseQuery: fetchBaseQueryWithReauth(baseQuery),
  // TODO: Update caching behavior for endpoints to avoid re-fetching data on
  // each mount (docs: https://redux-toolkit.js.org/rtk-query/usage/automated-refetching).
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});

export default api;
