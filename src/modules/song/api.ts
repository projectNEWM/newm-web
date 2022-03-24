import api from "api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSongs: build.query({
      query: () => "portal/songs",
    }),
  }),
  overrideExisting: false,
});

export default extendedApi;
