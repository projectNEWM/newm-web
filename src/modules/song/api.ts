import api from "api";

export const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSongs: build.query({
      query: () => "portal/songs",
    }),
  }),
});

export default extendedApi;
