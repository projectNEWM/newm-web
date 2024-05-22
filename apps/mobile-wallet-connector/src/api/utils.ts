import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { AxiosRequestConfig } from "axios";
import { ReCaptchaInstance, load } from "recaptcha-v3";
import { recaptchaEndpointActionMap } from "./constants";

let recaptcha: ReCaptchaInstance | undefined;

const executeRecaptcha = async (action: string) => {
  if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_STAGING) {
    throw new Error("Missing Recaptcha site key environment variable");
  }

  if (!recaptcha) {
    recaptcha = await load(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_STAGING, {
      autoHideBadge: true,
    });
  }

  return await recaptcha.execute(action);
};

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
