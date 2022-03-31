import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "store";
import Cookies from "js-cookie";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://staging-newm-server.herokuapp.com/",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const { isLoggedIn } = state.session;
      const apiToken = Cookies.get("apiToken");

      if (isLoggedIn && apiToken) {
        headers.set("Authorization", `Bearer ${apiToken}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default api;
