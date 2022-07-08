import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
import { Mutex } from "async-mutex";
import { logOut, receiveRefreshToken } from "modules/session";

const mutex = new Mutex();

/**
 * Wraps a base query with functionality to refresh the access token
 * if it is no longer valid and retry the request. Utilizes Mutex to prevent
 * simultaneous calls to refresh the token.
 */
export const fetchBaseQueryWithReauth = (
  baseQuery: BaseQueryFn<
    string | FetchArgs,
    any, // eslint-disable-line @typescript-eslint/no-explicit-any
    FetchBaseQueryError
  >
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  return async (args, api, extraOptions) => {
    const makeRequestWithRefreshedAccessToken = async () => {
      const accessToken = Cookies.get("accessToken");

      const argsWithHeader =
        typeof args === "string"
          ? {
              url: args,
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          : {
              ...args,
              headers: { Authorization: `Bearer ${accessToken}` },
            };

      return await baseQuery(argsWithHeader, api, extraOptions);
    };

    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();

    // get current refresh token
    const refreshToken = Cookies.get("refreshToken");

    // attempt request
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401 && refreshToken) {
      // check whether the mutex is unlocked before attempting refresh
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          // get new access and refresh token
          const refreshResult = await baseQuery(
            {
              url: "/v1/auth/refresh",
              headers: { Authorization: `Bearer ${refreshToken}` },
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            api.dispatch(receiveRefreshToken(refreshResult.data));

            result = await makeRequestWithRefreshedAccessToken();
          } else {
            api.dispatch(logOut());
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await makeRequestWithRefreshedAccessToken();
      }
    }

    return result;
  };
};
