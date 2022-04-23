import api from "api";
import { ContentResponse } from "./types";

export const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getContent: build.query<ContentResponse, void>({
      query: () => "v1/content",
    }),
  }),
});

export const { useGetContentQuery } = extendedApi;

export default extendedApi;
