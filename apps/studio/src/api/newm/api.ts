import { createApi } from "@reduxjs/toolkit/query/react";
import { baseUrls } from "../../buildParams";
import { Tags } from "./types";
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
