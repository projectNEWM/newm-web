import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import Cookies from "js-cookie";
import { RootState } from "@newm.io/studio/store";
import { Mutex } from "async-mutex";
import { NewmAuthResponse, logOut, receiveRefreshToken } from "@newm.io/studio/modules/session";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { AxiosBaseQueryParams, BaseQuery } from "./types";

const mutex = new Mutex();

/**
 * Wraps a base query with functionality to refresh the access token if it is
 * no longer valid and retry the request. Can be passed an optional alternate
 * baseQuery for the refresh token API call. Utilizes Mutex to prevent
 * additional API calls while refreshing the token.
 */
export const fetchBaseQueryWithReauth = (baseQuery: BaseQuery, refreshBaseQuery?: BaseQuery): BaseQuery => {
  return async (args, api, extraOptions) => {
    const makeRequestWithRefreshedAccessToken = async () => {
      return await baseQuery(args, api, extraOptions);
    };

    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();

    // get current refresh token
    const refreshToken = Cookies.get("refreshToken");

    // attempt request
    let result = await baseQuery(args, api, extraOptions);

    if (
      result.error &&
      typeof result.error === "object" &&
      "status" in result.error &&
      result.error.status === 401 &&
      refreshToken
    ) {
      // check whether the mutex is unlocked before attempting refresh
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        const baseQueryForRefresh = refreshBaseQuery || baseQuery;

        try {
          // get new access and refresh token
          const refreshResult = await baseQueryForRefresh(
            {
              url: "v1/auth/refresh",
              method: "GET",
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            const authResponse = refreshResult.data as NewmAuthResponse;
            api.dispatch(receiveRefreshToken(authResponse));

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

/**
 * Sets up base query using axios request library (allows for tracking
 * upload progress, which the native fetch library does not).
 */
export const axiosBaseQuery = ({ baseUrl, prepareHeaders }: AxiosBaseQueryParams = { baseUrl: "" }): BaseQuery => {
  return async ({ url, method, body, params, headers = {}, onUploadProgress }, api) => {
    try {
      const axiosInstance = axios.create({
        headers: prepareHeaders ? prepareHeaders(api, headers) : headers,

        // convert array params to comma separated strings
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();
          for (const key of Object.keys(params)) {
            const param = params[key];
            if (Array.isArray(param)) {
              for (const p of param) {
                searchParams.append(key, p);
              }
            } else {
              searchParams.append(key, param);
            }
          }

          return searchParams.toString();
        },
      });

      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data: body,
        params,
        headers,
        onUploadProgress,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
};

/**
 * Adds auth header to requests. Can be overwritten by an auth
 * header present in a specific request.
 */
export const prepareAuthHeader = (api: BaseQueryApi, headers: AxiosRequestConfig["headers"]) => {
  const state = api.getState() as RootState;
  const { isLoggedIn } = state.session;
  const accessToken = Cookies.get("accessToken");

  if (isLoggedIn && accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    };
  }

  return headers;
};
