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
  tagTypes: [
    Tags.Collaboration,
    Tags.Genres,
    Tags.Languages,
    Tags.Profile,
    Tags.Roles,
    Tags.Song,
  ],
  baseQuery: fetchBaseQueryWithReauth(baseQuery),
  endpoints: () => ({}),
});

export default api;
