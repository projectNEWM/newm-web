import api, { Tags } from "api";
import { setToastMessage } from "modules/ui";
import { Genre, Language, Role } from "./types";

export const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGenres: build.query<Genre[], void>({
      query: () => ({ url: "v1/distribution/genres", method: "GET" }),
      providesTags: [Tags.Genres],

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching genres",
              severity: "error",
            })
          );
        }
      },
    }),
    getRoles: build.query<Role[], void>({
      query: () => ({ url: "v1/distribution/roles", method: "GET" }),
      providesTags: [Tags.Roles],

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
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
      query: () => ({ url: "contents/predefined-moods.json", method: "GET" }),

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching moods",
              severity: "error",
            })
          );
        }
      },
    }),
    getLanguages: build.query<Language[], void>({
      query: () => ({ url: "v1/distribution/languages", method: "GET" }),
      providesTags: [Tags.Languages],

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching languages",
              severity: "error",
            })
          );
        }
      },
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetLanguagesQuery,
  useGetMoodsQuery,
  useGetRolesQuery,
} = extendedApi;

export default extendedApi;
