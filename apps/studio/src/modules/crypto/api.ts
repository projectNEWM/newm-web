import { GetADAPriceResponse, GetNEWMPriceResponse } from "./types";
import { newmApi } from "../../api";
import { setToastMessage } from "../../modules/ui";

export const extendedApi = newmApi.injectEndpoints({
  endpoints: (build) => ({
    getADAPrice: build.query<GetADAPriceResponse, void>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred fetching ADA price",
              severity: "error",
            })
          );
        }
      },

      query: () => ({
        method: "GET",
        url: "v1/cardano/prices/ada",
      }),
    }),
    getNEWMPrice: build.query<GetNEWMPriceResponse, void>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred fetching NEWM price",
              severity: "error",
            })
          );
        }
      },

      query: () => ({
        method: "GET",
        url: "v1/cardano/prices/newm",
      }),
    }),
  }),
});

export const { useGetNEWMPriceQuery, useGetADAPriceQuery } = extendedApi;

export default extendedApi;
