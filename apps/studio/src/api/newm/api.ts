import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@newm-web/utils";
import { Tags } from "./types";
import { baseUrls } from "../../buildParams";
import { fetchBaseQueryWithReauth, prepareHeaders } from "../utils";

export const baseQuery = axiosBaseQuery({
  baseUrl: baseUrls.newm,
  prepareHeaders,
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
    Tags.Sale,
    Tags.Song,
    Tags.Earnings,
  ],
});

export default api;
