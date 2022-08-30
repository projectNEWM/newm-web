import api from "api";
import { setToastMessage } from "modules/ui";
import { receiveContent } from "./slice";
import { ContentResponse } from "./types";

export const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getContent: build.query<ContentResponse, void>({
      query: () => "v1/content",

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(receiveContent(data));
          // eslint-disable-next-line
        } catch (resp) {
          dispatch(
            setToastMessage({
              message: "An error occurred while fetching content data",
              severity: "error",
            })
          );
        }
      },
    }),
  }),
});

export const { useGetContentQuery } = extendedApi;

export default extendedApi;
