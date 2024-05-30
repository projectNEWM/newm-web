import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@newm-web/utils";
import { baseUrls } from "../../buildParams";
import { prepareHeaders } from "../utils";

export const baseQuery = axiosBaseQuery({
  baseUrl: baseUrls.newm,
  prepareHeaders,
});

export const newmApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  reducerPath: "newmApi",
});
