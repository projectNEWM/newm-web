import api, { Tags } from "api";
import { setToastMessage } from "modules/ui";
import { Genre, Language, Role } from "./types";

export const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGenres: build.query<Genre[], void>({
      query: () => "v1/distribution/genres",
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
      query: () => "v1/distribution/roles",
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
      query: () => "contents/predefined-moods.json",

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
      query: () => "v1/distribution/languages",
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
