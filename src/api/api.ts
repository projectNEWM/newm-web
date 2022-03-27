import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://staging-newm-server.herokuapp.com/",
    baseUrl: "https://newm-app-pip-wlara-cors-z40ymg.herokuapp.com/",
  }),
  endpoints: () => ({}),
});

export default api;
