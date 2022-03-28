import api from "api";
import Cookies from "js-cookie";

export const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSongs: build.query({
      query: () => ({
        url: "v1/portal/songs",
        headers: { Authorization: `Bearer ${Cookies.get("apiToken")}` },
      }),
    }),
  }),
});

export const { useGetSongsQuery } = extendedApi;

export default extendedApi;
