import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import Cookies from "js-cookie";
import { Mutex } from "async-mutex";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { executeRecaptcha } from "@newm-web/utils";
import { AxiosBaseQueryParams, BaseQuery } from "./types";
import { logOutExpiredSession, receiveRefreshToken } from "./actions";
import { recaptchaEndpointActionMap } from "./constants";
import { RootState } from "../store";
import { NewmAuthResponse } from "../modules/session";

const mutex = new Mutex();

/**
 * Wraps a base query with functionality to refresh the access token if it is
 * no longer valid and retry the request. Can be passed an optional alternate
 * baseQuery for the refresh token API call. Utilizes Mutex to prevent
 * additional API calls while refreshing the token.
 */
export const fetchBaseQueryWithReauth = (
  baseQuery: BaseQuery,
  refreshBaseQuery?: BaseQuery
): BaseQuery => {
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
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
              method: "GET",
              url: "v1/auth/refresh",
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            const authResponse = refreshResult.data as NewmAuthResponse;
            api.dispatch(receiveRefreshToken(authResponse));

            result = await makeRequestWithRefreshedAccessToken();
          } else {
            api.dispatch(logOutExpiredSession());
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
export const axiosBaseQuery = (
  { baseUrl, prepareHeaders }: AxiosBaseQueryParams = { baseUrl: "" }
): BaseQuery => {
  return async (
    { url, method, body, params, headers = {}, onUploadProgress },
    api
  ) => {
    try {
      const axiosInstance = axios.create({
        headers: prepareHeaders ? await prepareHeaders(api, headers) : headers,

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
        data: body,
        headers,
        method,
        onUploadProgress,
        params,
        url: baseUrl + url,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return {
        error: {
          data: err.response?.data || err.message,
          status: err.response?.status,
        },
      };
    }
  };
};

/**
 * Gets NEWM service auth header. Can be overwritten by an auth
 * header present for a specific request.
 */
export const getAuthHeaders = (api: BaseQueryApi) => {
  const state = api.getState() as RootState;
  const { isLoggedIn } = state.session;
  const accessToken = Cookies.get("accessToken");

  if (isLoggedIn && accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return {};
};

/**
 * Returns recaptcha headers for unauthenticated requests.
 */
export const getRecaptchaHeaders = async (api: BaseQueryApi) => {
  const { endpoint } = api;
  const state = api.getState() as RootState;
  const { isLoggedIn } = state.session;
  const action = recaptchaEndpointActionMap[endpoint] || endpoint;

  if (!isLoggedIn) {
    return {
      "g-recaptcha-platform": "Web",
      "g-recaptcha-token": await executeRecaptcha(action),
    };
  }

  return {};
};

/**
 * Adds necessary authentication headers to requests.
 */
export const prepareHeaders = async (
  api: BaseQueryApi,
  headers: AxiosRequestConfig["headers"]
) => {
  const authHeaders = getAuthHeaders(api);
  const recaptchaHeaders = await getRecaptchaHeaders(api);

  return {
    ...authHeaders,
    ...recaptchaHeaders,
    ...headers,
  };
};

export const getApiErrorStatus = (err: unknown) => {
  if (
    err &&
    typeof err === "object" &&
    "error" in err &&
    err.error &&
    typeof err.error === "object" &&
    "status" in err.error
  ) {
    return err.error.status;
  }

  return undefined;
};
