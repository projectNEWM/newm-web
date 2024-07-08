import { ApiSale, GetSalesParams, GetSalesResponse } from "@newm-web/types";
import { transformApiSale } from "@newm-web/utils";
import {
  EndSaleAmountRequest,
  EndSaleAmountResponse,
  EndSaleTransactionRequest,
  EndSaleTransactionResponse,
  StartSaleAmountRequest,
  StartSaleAmountResponse,
  StartSaleTransactionRequest,
  StartSaleTransactionResponse,
} from "./types";
import { newmApi } from "../../api";
import { setToastMessage } from "../../modules/ui";
import { Tags } from "../../api/newm/types";

export const extendedApi = newmApi.injectEndpoints({
  endpoints: (build) => ({
    endSaleAmount: build.mutation<EndSaleAmountResponse, EndSaleAmountRequest>({
      invalidatesTags: [Tags.Sale],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while generating the sale end amount",
              severity: "error",
            })
          );
        }
      },

      query: (body) => ({
        body,
        method: "POST",
        url: "v1/marketplace/sales/end/amount",
      }),
    }),
    endSaleTransaction: build.mutation<
      EndSaleTransactionResponse,
      EndSaleTransactionRequest
    >({
      invalidatesTags: [Tags.Sale],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message:
                "An error occurred while generating the sale end transaction",
              severity: "error",
            })
          );
        }
      },

      query: (body) => ({
        body,
        method: "POST",
        url: "v1/marketplace/sales/end/transaction",
      }),
    }),

    getSales: build.query<GetSalesResponse, GetSalesParams | void>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching sale data",
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
        statuses,
        ...rest
      } = {}) => ({
        method: "GET",
        params: {
          ...(ids ? { ids: ids.join(",") } : {}),
          ...(artistIds ? { artistIds: artistIds.join(",") } : {}),
          ...(genres ? { genres: genres.join(",") } : {}),
          ...(moods ? { moods: moods.join(",") } : {}),
          ...(songIds ? { songIds: songIds.join(",") } : {}),
          ...(statuses ? { statuses: statuses.join(",") } : {}),
          ...rest,
        },
        url: "v1/marketplace/sales",
      }),

      transformResponse: (apiSales: ReadonlyArray<ApiSale>) => {
        return apiSales.map(transformApiSale);
      },
    }),
    startSaleAmount: build.mutation<
      StartSaleAmountResponse,
      StartSaleAmountRequest
    >({
      invalidatesTags: [Tags.Sale],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message:
                "An error occurred while generating the sale start amount",
              severity: "error",
            })
          );
        }
      },

      query: (body) => ({
        body,
        method: "POST",
        url: "v1/marketplace/sales/start/amount",
      }),
    }),
    startSaleTransaction: build.mutation<
      StartSaleTransactionResponse,
      StartSaleTransactionRequest
    >({
      invalidatesTags: [Tags.Sale],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message:
                "An error occurred while generating the sale start transaction",
              severity: "error",
            })
          );
        }
      },

      query: (body) => ({
        body,
        method: "POST",
        url: "v1/marketplace/sales/start/transaction",
      }),
    }),
  }),
});

export const { useGetSalesQuery } = extendedApi;

export default extendedApi;
