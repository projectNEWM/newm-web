import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrls } from "buildParams";
import { prepareNewmAuthHeader } from "common/apiUtils";
import { Tags } from "./types";
import { fetchBaseQueryWithReauth } from "./utils";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrls.newm,
  prepareHeaders: prepareNewmAuthHeader,
});

const api = createApi({
  reducerPath: "newmApi",
  tagTypes: [Tags.Profile, Tags.Song, Tags.Collaborator, Tags.Collaboration],
  baseQuery: fetchBaseQueryWithReauth(baseQuery),
  endpoints: () => ({}),
});

export default api;
