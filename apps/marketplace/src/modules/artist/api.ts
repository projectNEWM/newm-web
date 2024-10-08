import {
  GetArtistCountParams,
  GetArtistCountResponse,
  GetArtistResponse,
  GetArtistsParams,
  GetArtistsResponse,
} from "./types";
import { newmApi } from "../../api";
import { setToastMessage } from "../ui";
import { Tags } from "../../api/newm/types";

export const extendedApi = newmApi.injectEndpoints({
  endpoints: (build) => ({
    getArtist: build.query<GetArtistResponse, string>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching artist",
              severity: "error",
            })
          );
        }
      },

      providesTags: [Tags.Artist],

      query: (id) => ({
        method: "GET",
        url: `v1/marketplace/artists/${id}`,
      }),
    }),
    getArtistCount: build.query<
      GetArtistCountResponse,
      GetArtistCountParams | void
    >({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching number of artists",
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
        url: "v1/marketplace/artists/count",
      }),
    }),
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
  }),
});

export const { useGetArtistsQuery, useGetArtistQuery, useGetArtistCountQuery } =
  extendedApi;

export default extendedApi;
