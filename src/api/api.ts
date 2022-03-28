import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "store";
import Cookies from "js-cookie";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://staging-newm-server.herokuapp.com/",
    baseUrl: "https://newm-app-pip-wlara-cors-z40ymg.herokuapp.com/",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const { isLoggedIn } = state.session;

      if (isLoggedIn) {
        headers.set("Authorization", `Bearer ${Cookies.get("apiToken")}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default api;
