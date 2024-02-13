import { isProd } from "./constants";

/**
 * References the correct public environment variable.
 */
const getAppEnvVar = (name: string): string => {
  switch (name) {
    case "APPLE_CLIENT_ID":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_APPLE_CLIENT_ID
        : import.meta.env.VITE_APPLE_CLIENT_ID;
    case "GOOGLE_CLIENT_ID":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
        : import.meta.env.VITE_GOOGLE_CLIENT_ID;
    case "GA_STUDIO_ID":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_GA_STUDIO_ID
        : import.meta.env.VITE_GA_STUDIO_ID;
    case "RECAPTCHA_SITE_KEY":
      if (isProd) {
        return typeof process !== "undefined"
          ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_PROD
          : import.meta.env.VITE_RECAPTCHA_SITE_KEY_PROD;
      } else {
        return typeof process !== "undefined"
          ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_STAGING
          : import.meta.env.VITE_RECAPTCHA_SITE_KEY_STAGING;
      }
    case "ENV":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_ENV
        : import.meta.env.VITE_ENV;
    default:
      return "";
  }
};

export const APPLE_CLIENT_ID = getAppEnvVar("APPLE_CLIENT_ID");
export const GOOGLE_CLIENT_ID = getAppEnvVar("GOOGLE_CLIENT_ID");
export const GA_STUDIO_ID = getAppEnvVar("GA_STUDIO_ID");
export const RECAPTCHA_SITE_KEY = getAppEnvVar("RECAPTCHA_SITE_KEY");
export const ENV = getAppEnvVar("ENV");

export const NODE_ENV = process.env.NODE_ENV;
