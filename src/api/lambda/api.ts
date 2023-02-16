import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrls } from "buildParams";
import { prepareNewmAuthHeader } from "common/apiUtils";

const api = createApi({
  reducerPath: "lambdaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrls.lambda,
    prepareHeaders: prepareNewmAuthHeader,
  }),
  endpoints: () => ({}),
});

export default api;
