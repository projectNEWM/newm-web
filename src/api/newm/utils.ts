import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
import { logOut, receiveRefreshToken } from "modules/session";

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

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401 && refreshToken) {
      const refreshResult = await baseQuery(
        "/v1/auth/refresh",
        api,
        extraOptions
      );

      if (refreshResult.data) {
        api.dispatch(receiveRefreshToken(refreshResult.data));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
      }
    }

    return result;
  };

  return baseQueryWithReauth;
};
