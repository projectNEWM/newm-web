import api, { Tags } from "api";
import { setToastMessage } from "modules/ui";
import { GetSongGenresResponse, GetSongRolesResponse } from "./types";

export const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGenres: build.query<GetSongGenresResponse, void>({
      query: () => "v1/distribution/genres",
      providesTags: [Tags.Genres],

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching genres",
              severity: "error",
            })
          );
        }
      },
    }),
    getRoles: build.query<GetSongRolesResponse, void>({
      query: () => "v1/distribution/roles",
      providesTags: [Tags.Roles],

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching roles",
              severity: "error",
            })
          );
        }
      },
    }),
    getMoods: build.query<Array<string>, void>({
      query: () => "contents/predefined-moods.json",

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching moods",
              severity: "error",
            })
          );
        }
      },
    }),
  }),
});

export const { useGetGenresQuery, useGetRolesQuery, useGetMoodsQuery } =
  extendedApi;

export default extendedApi;
