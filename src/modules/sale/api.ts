import { phyrhoseApi as api } from "api";
import { setToastMessage } from "modules/ui";
import { receiveBundleSales } from "./slice";
import { SaleBundlesResp } from "./types";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSaleBundles: build.query<SaleBundlesResp, string>({
      query: (projectId) => ({
        url: `firehose/ftSaleBundles?projectId=${projectId}`,
        method: "GET",
      }),

      async onQueryStarted(param, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(receiveBundleSales(data));
        } catch (err) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching sale information",
              severity: "error",
            })
          );
        }
      },
    }),
  }),
});

export const { useGetSaleBundlesQuery } = extendedApi;

export default extendedApi;
