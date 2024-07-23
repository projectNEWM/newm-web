import { GetStudioClientConfigResponse } from "./types";
import { newmApi } from "../../api";
import { setToastMessage } from "../../modules/ui";

export const extendedApi = newmApi.injectEndpoints({
  endpoints: (build) => ({
    getMarketplaceClientConfig: build.query<
      GetStudioClientConfigResponse,
      void
    >({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching app config",
              severity: "error",
            })
          );
        }
      },

      query: () => ({ method: "GET", url: "v1/client-config/marketplace" }),
    }),
  }),
});

export const { useGetMarketplaceClientConfigQuery } = extendedApi;

export default extendedApi;
