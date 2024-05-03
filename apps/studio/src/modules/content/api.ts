import { Country, Genre, Language, Role } from "./types";
import { Tags, newmApi } from "../../api";
import { setToastMessage } from "../../modules/ui";

export const extendedApi = newmApi.injectEndpoints({
  endpoints: (build) => ({
    getCountries: build.query<Array<string>, void>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching countries",
              severity: "error",
            })
          );
        }
      },

      query: () => ({ method: "GET", url: "v1/distribution/countries" }),
      transformResponse: (response: Country[]) => {
        const extracted = response.map((country) => country.country_name);

        // Sort alphabetically
        return extracted.sort((a, b) => a.localeCompare(b));
      },
    }),
    getGenres: build.query<string[], void>({
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
      providesTags: [Tags.Genres],

      query: () => ({ method: "GET", url: "v1/distribution/genres" }),
      transformResponse: (response: Genre[]) => {
        const extracted = response.map((genre) => genre.name);

        // Sort alphabetically
        return extracted.sort((a, b) => a.localeCompare(b));
      },
    }),
    getISRCCountryCodes: build.query<string[], void>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching ISRC country codes",
              severity: "error",
            })
          );
        }
      },

      query: () => ({ method: "GET", url: "contents/isrc-country-codes.json" }),
    }),
    getLanguages: build.query<Language[], void>({
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
      providesTags: [Tags.Languages],

      query: () => ({ method: "GET", url: "v1/distribution/languages" }),
    }),
    getMoods: build.query<Array<string>, void>({
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

      query: () => ({ method: "GET", url: "contents/predefined-moods.json" }),
    }),
    getRoles: build.query<string[], void>({
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
      providesTags: [Tags.Roles],

      query: () => ({ method: "GET", url: "v1/distribution/roles" }),
      transformResponse: (response: Role[]) => {
        const extracted = response.map((role) => role.name);

        // Sort alphabetically
        return extracted.sort((a, b) => a.localeCompare(b));
      },
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useGetGenresQuery,
  useGetISRCCountryCodesQuery,
  useGetLanguagesQuery,
  useGetMoodsQuery,
  useGetRolesQuery,
} = extendedApi;

export default extendedApi;
