import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { AxiosRequestConfig } from "axios";
import { executeRecaptcha } from "@newm-web/utils";
import { recaptchaEndpointActionMap } from "./constants";

/**
 * Returns recaptcha headers for unauthenticated requests.
 */
export const getRecaptchaHeaders = async (api: BaseQueryApi) => {
  const { endpoint } = api;
  const action = recaptchaEndpointActionMap[endpoint];

  if (!action) return {};

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
