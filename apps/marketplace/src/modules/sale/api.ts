import { SaleResponse, SalesResponse } from "./types";
import { newmApi } from "../../api";
import { setToastMessage } from "../../modules/ui";
import { Tags } from "../../api/newm/types";

export const extendedApi = newmApi.injectEndpoints({
  endpoints: (build) => ({
    getSale: build.query<SaleResponse, string>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching available songs",
              severity: "error",
            })
          );
        }
      },

      providesTags: [Tags.Sale],

      query: (saleId) => ({
        method: "GET",
        url: `/v1/marketplace/sales/${saleId}`,
      }),
    }),
    getSales: build.query<SalesResponse, void>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching available songs",
              severity: "error",
            })
          );
        }
      },

      providesTags: [Tags.Sale],

      query: (body) => ({
        body,
        method: "GET",
        url: "/v1/marketplace/sales",
      }),
    }),
  }),
});

export const { useGetSaleQuery, useGetSalesQuery } = extendedApi;

export default extendedApi;
