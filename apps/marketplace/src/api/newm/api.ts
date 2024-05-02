import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@newm-web/utils";
import { Tags } from "./types";
import { prepareHeaders } from "../utils";
import { baseUrls } from "../../buildParams";

export const baseQuery = axiosBaseQuery({
  baseUrl: baseUrls.newm,
  prepareHeaders,
});

const api = createApi({
  baseQuery,
  endpoints: () => ({}),
  reducerPath: "newmApi",
  tagTypes: [Tags.Sale],
});

export default api;
