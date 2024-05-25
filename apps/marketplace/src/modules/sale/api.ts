import {
  ApiSale,
  GetArtistsParams,
  GetArtistsResponse,
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
    getArtists: build.query<GetArtistsResponse, GetArtistsParams | void>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching artists",
              severity: "error",
            })
          );
        }
      },

      providesTags: [Tags.Artist],

      query: ({ ids, genres, ...rest } = {}) => ({
        method: "GET",
        params: {
          ...(ids ? { ids: ids.join(",") } : {}),
          ...(genres ? { genres: genres.join(",") } : {}),
          ...rest,
        },
        url: "v1/marketplace/artists",
      }),
    }),
    getSale: build.query<GetSaleResponse, string>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching sale details",
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

export const { useGetArtistsQuery, useGetSaleQuery, useGetSalesQuery } =
  extendedApi;

export default extendedApi;
