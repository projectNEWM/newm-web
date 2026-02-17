import { AxiosBaseQueryParams, BaseQuery } from "@newm-web/types";
import axios, { AxiosError } from "axios";

/**
 * Sets up RTKQuery base query using axios request library (allows for
 * tracking upload progress, which the native fetch library does not).
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
