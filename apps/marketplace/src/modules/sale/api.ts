import {
  ApiSale,
  GetSaleResponse,
  GetSalesParams,
  GetSalesResponse,
} from "./types";
import { transformApiSale } from "./utils";
import { newmApi } from "../../api";
import { setToastMessage } from "../../modules/ui";
import { Tags } from "../../api/newm/types";

export const extendedApi = newmApi.injectEndpoints({
  endpoints: (build) => ({
    getSale: build.query<GetSaleResponse, string>({
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

      transformResponse: (apiSale: ApiSale) => {
        return transformApiSale(apiSale);
      },
    }),
    getSales: build.query<GetSalesResponse, GetSalesParams | void>({
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
        url: "/v1/marketplace/sales",
      }),

      transformResponse: (apiSales: ReadonlyArray<ApiSale>) => {
        return apiSales.map(transformApiSale);
      },
    }),
  }),
});

export const { useGetSaleQuery, useGetSalesQuery } = extendedApi;

export default extendedApi;
