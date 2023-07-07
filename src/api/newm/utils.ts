import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
import { RootState } from "store";
import { Mutex } from "async-mutex";
import {
  NewmAuthResponse,
  handleLogout,
  receiveRefreshToken,
} from "modules/session";

const mutex = new Mutex();

/**
 * Wraps a base query with functionality to refresh the access token if it is
 * no longer valid and retry the request. Can be passed an optional alternate
 * baseQuery for the refresh token API call. Utilizes Mutex to prevent
 * additional API calls while refreshing the token.
 */
export const fetchBaseQueryWithReauth = (
  baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  refreshBaseQuery?: BaseQueryFn<
    string | FetchArgs,
    unknown,
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

        const baseQueryForRefresh = refreshBaseQuery || baseQuery;

        try {
          // get new access and refresh token
          const refreshResult = await baseQueryForRefresh(
            {
              url: "/v1/auth/refresh",
              headers: { Authorization: `Bearer ${refreshToken}` },
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            const authResponse = refreshResult.data as NewmAuthResponse;
            api.dispatch(receiveRefreshToken(authResponse));

            result = await makeRequestWithRefreshedAccessToken();
          } else {
            api.dispatch(handleLogout());
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

export const prepareAuthHeader = (
  headers: Headers,
  {
    getState,
  }: Pick<BaseQueryApi, "type" | "getState" | "extra" | "endpoint" | "forced">
) => {
  const state = getState() as RootState;
  const { isLoggedIn } = state.session;
  const accessToken = Cookies.get("accessToken");
  const hasAuthHeader = !!headers.get("Authorization");

  if (isLoggedIn && accessToken && !hasAuthHeader) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return headers;
};
