import { transformApiSale } from "@newm-web/utils";
import {
  ApiSale,
  GenerateOrderRequest,
  GenerateOrderResponse,
  GenerateTransactionRequest,
  GenerateTransactionResponse,
  GetSaleCountParams,
  GetSaleCountResponse,
  GetSaleResponse,
  GetSalesParams,
  GetSalesResponse,
} from "@newm-web/types";
import { GetOrderFeesResponse } from "./types";
import { newmApi } from "../../api";
import { setToastMessage } from "../../modules/ui";
import { Tags } from "../../api/newm/types";

export const extendedApi = newmApi.injectEndpoints({
  endpoints: (build) => ({
    generateOrder: build.mutation<GenerateOrderResponse, GenerateOrderRequest>({
      invalidatesTags: [Tags.Sale],

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while generating order",
              severity: "error",
            })
          );
        }
      },

      query: (body) => ({
        body,
        method: "POST",
        url: "v1/marketplace/orders/amount",
      }),
    }),
    generateTransaction: build.mutation<
      GenerateTransactionResponse,
      GenerateTransactionRequest
    >({
      invalidatesTags: [Tags.Sale],

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while generating transaction",
              severity: "error",
            })
          );
        }
      },

      query: (body) => ({
        body,
        method: "POST",
        url: "v1/marketplace/orders/transaction",
      }),
    }),
    getOrderFees: build.query<GetOrderFeesResponse, void>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching order fees",
              severity: "error",
            })
          );
        }
      },

      providesTags: [Tags.OrderFees],

      query: () => ({ method: "GET", url: "v1/marketplace/orders/fees" }),
    }),
    getSale: build.query<GetSaleResponse, string>({
      providesTags: [Tags.Sale],

      query: (saleId) => ({
        method: "GET",
        url: `v1/marketplace/sales/${saleId}`,
      }),

      transformResponse: (apiSale: ApiSale) => {
        return transformApiSale(apiSale);
      },
    }),
    getSaleCount: build.query<GetSaleCountResponse, GetSaleCountParams | void>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching number of songs",
              severity: "error",
            })
          );
        }
      },

      providesTags: [Tags.Sale],

      query: ({
        ids,
        artistIds,
        genres,
        moods,
        songIds,
        saleStatuses,
        ...rest
      } = {}) => ({
        method: "GET",
        params: {
          ...(ids ? { ids: ids.join(",") } : {}),
          ...(artistIds ? { artistIds: artistIds.join(",") } : {}),
          ...(genres ? { genres: genres.join(",") } : {}),
          ...(moods ? { moods: moods.join(",") } : {}),
          ...(songIds ? { songIds: songIds.join(",") } : {}),
          ...(saleStatuses ? { saleStatuses: saleStatuses.join(",") } : {}),
          ...rest,
        },
        url: "v1/marketplace/sales/count",
      }),
    }),
    getSales: build.query<GetSalesResponse, GetSalesParams | void>({
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
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

      query: ({
        ids,
        artistIds,
        genres,
        moods,
        songIds,
        saleStatuses,
        ...rest
      } = {}) => ({
        method: "GET",
        params: {
          ...(ids ? { ids: ids.join(",") } : {}),
          ...(artistIds ? { artistIds: artistIds.join(",") } : {}),
          ...(genres ? { genres: genres.join(",") } : {}),
          ...(moods ? { moods: moods.join(",") } : {}),
          ...(songIds ? { songIds: songIds.join(",") } : {}),
          ...(saleStatuses ? { saleStatuses: saleStatuses.join(",") } : {}),
          ...rest,
        },
        url: "v1/marketplace/sales",
      }),

      transformResponse: (apiSales: ReadonlyArray<ApiSale>) => {
        return apiSales.map(transformApiSale);
      },
    }),
  }),
});

export const {
  useGetSaleQuery,
  useGetSalesQuery,
  useGetSaleCountQuery,
  useGetOrderFeesQuery,
} = extendedApi;

export default extendedApi;
