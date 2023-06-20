import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrls } from "buildParams";
import { fetchBaseQueryWithReauth, prepareAuthHeader } from "./utils";
import { Tags } from "./types";

export const baseQuery = fetchBaseQuery({
  baseUrl: baseUrls.newm,
  prepareHeaders: prepareAuthHeader,
});

const api = createApi({
  reducerPath: "newmApi",
  tagTypes: [Tags.Profile, Tags.Song, Tags.Collaboration],
  baseQuery: fetchBaseQueryWithReauth(baseQuery),
  endpoints: () => ({}),
});

export default api;
