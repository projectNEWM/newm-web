import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "alphaAdvantageApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.alphavantage.co/" }),
  endpoints: () => ({}),
});

export default api;
