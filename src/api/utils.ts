import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
import { loggedOut, sessionRefreshed } from "modules/session";

/**
 * Takes a base query as an argument and wraps it in functionality to attempt
 * to refresh the session when the access token is no longer valid.
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

    if (result.error && result.error.status === 401) {
      const refreshResult = await baseQuery(
        {
          url: "/v1/auth/refresh",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // refresh session
        api.dispatch(sessionRefreshed(refreshResult.data));

        // retry original request
        result = await baseQuery(args, api, extraOptions);
      } else {
        // log the user out
        api.dispatch(loggedOut());
      }
    }

    return result;
  };

  return baseQueryWithReauth;
};
