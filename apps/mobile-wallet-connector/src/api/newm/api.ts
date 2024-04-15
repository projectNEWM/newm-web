import { createApi } from "@reduxjs/toolkit/query/react";
import { baseUrls } from "../../buildParams";
import { axiosBaseQuery, prepareHeaders } from "../utils";

export const baseQuery = axiosBaseQuery({
  baseUrl: baseUrls.newm,
  prepareHeaders,
});

export const newmApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  reducerPath: "newmApi",
});
