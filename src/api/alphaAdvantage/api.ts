import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrls } from "buildParams";

const api = createApi({
  reducerPath: "alphaAdvantageApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrls.alphaAdvantage }),
  endpoints: () => ({}),
});

export default api;
