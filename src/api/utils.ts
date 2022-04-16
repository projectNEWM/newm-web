import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  retry,
} from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
import { extendedApi as sessionApi } from "modules/session";

/**
 * Wraps a base query with functionality to refresh the access token
 * if it is no longer valid and retry the request.
 */
export const fetchBaseQueryWithReauth = (
  baseQuery: BaseQueryFn<
    string | FetchArgs,
    any, // eslint-disable-line @typescript-eslint/no-explicit-any
    FetchBaseQueryError
  >
) => {
  const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    const refreshToken = Cookies.get("refreshToken");

    const result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401 && refreshToken) {
      await api.dispatch(
        sessionApi.endpoints.refreshToken.initiate(refreshToken)
      );
    }

    return result;
  };

  return retry(baseQueryWithReauth, { maxRetries: 1 });
};
