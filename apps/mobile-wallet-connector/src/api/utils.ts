import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { executeRecaptcha } from "@newm-web/utils";
import { AxiosBaseQueryParams, BaseQuery } from "@newm-web/types";
import { recaptchaEndpointActionMap } from "./constants";

/**
 * Returns recaptcha headers for unauthenticated requests.
 */
export const getRecaptchaHeaders = async (api: BaseQueryApi) => {
  const { endpoint } = api;
  const action = recaptchaEndpointActionMap[endpoint] || endpoint;

  return {
    "g-recaptcha-platform": "Web",
    "g-recaptcha-token": await executeRecaptcha(action),
  };
};

/**
 * Adds necessary authentication headers to requests.
 */
export const prepareHeaders = async (
  api: BaseQueryApi,
  headers: AxiosRequestConfig["headers"]
) => {
  const recaptchaHeaders = await getRecaptchaHeaders(api);

  return {
    ...recaptchaHeaders,
    ...headers,
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
