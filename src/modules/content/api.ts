import api from "api";
import { setToastMessage } from "modules/ui";

export const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGenres: build.query<Array<string>, void>({
      query: () => "contents/predefined-genres.json",

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
    getRoles: build.query<Array<string>, void>({
      query: () => "contents/predefined-roles.json",

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
