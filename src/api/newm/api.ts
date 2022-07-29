import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "store";
import Cookies from "js-cookie";
import { fetchBaseQueryWithReauth } from "./utils";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://staging-newm-server.herokuapp.com/",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const { isLoggedIn } = state.session;
    const accessToken = Cookies.get("accessToken");
    const hasAuthHeader = !!headers.get("Authorization");

    if (isLoggedIn && accessToken && !hasAuthHeader) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const api = createApi({
  reducerPath: "newmApi",
  baseQuery: fetchBaseQueryWithReauth(baseQuery),
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});

export default api;
