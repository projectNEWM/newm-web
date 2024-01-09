import { createApi } from "@reduxjs/toolkit/query/react";
import { Tags } from "./types";
import { baseUrls } from "../../buildParams";
import {
  axiosBaseQuery,
  fetchBaseQueryWithReauth,
  prepareAuthHeader,
} from "../utils";

export const baseQuery = axiosBaseQuery({
  baseUrl: baseUrls.newm,
  prepareHeaders: prepareAuthHeader,
});

const api = createApi({
  baseQuery: fetchBaseQueryWithReauth(baseQuery),
  endpoints: () => ({}),
  reducerPath: "newmApi",
  tagTypes: [
    Tags.Collaboration,
    Tags.Genres,
    Tags.Languages,
    Tags.Profile,
    Tags.Roles,
    Tags.Song,
  ],
});

export default api;
