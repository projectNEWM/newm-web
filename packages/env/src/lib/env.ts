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
    case "RECAPTCHA_SITE_KEY_STAGING":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_STAGING
        : import.meta.env.VITE_RECAPTCHA_SITE_KEY_STAGING;
    case "RECAPTCHA_SITE_KEY_PROD":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_PROD
        : import.meta.env.VITE_RECAPTCHA_SITE_KEY_PROD;
    case "DEXHUNTER_MARKETPLACE_PARTNER_CODE":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_DEXHUNTER_MARKETPLACE_PARTNER_CODE
        : import.meta.env.VITE_DEXHUNTER_MARKETPLACE_PARTNER_CODE;
    case "DEXHUNTER_TOOLS_PARTNER_CODE":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_DEXHUNTER_TOOLS_PARTNER_CODE
        : import.meta.env.VITE_DEXHUNTER_TOOLS_PARTNER_CODE;
    case "DEXHUNTER_STUDIO_PARTNER_CODE":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_DEXHUNTER_STUDIO_PARTNER_CODE
        : import.meta.env.VITE_DEXHUNTER_STUDIO_PARTNER_CODE;
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
export const DEXHUNTER_STUDIO_PARTNER_CODE = getAppEnvVar(
  "DEXHUNTER_STUDIO_PARTNER_CODE"
);
export const DEXHUNTER_MARKETPLACE_PARTNER_CODE = getAppEnvVar(
  "DEXHUNTER_MARKETPLACE_PARTNER_CODE"
);
export const DEXHUNTER_TOOLS_PARTNER_CODE = getAppEnvVar(
  "DEXHUNTER_TOOLS_PARTNER_CODE"
);
export const ENV = getAppEnvVar("ENV");

const NODE_ENV = process.env.NODE_ENV;
export const isProd = NODE_ENV === "production" && ENV === "production";

const RECAPTCHA_SITE_KEY_PROD = getAppEnvVar("RECAPTCHA_SITE_KEY_PROD");
const RECAPTCHA_SITE_KEY_STAGING = getAppEnvVar("RECAPTCHA_SITE_KEY_STAGING");
export const RECAPTCHA_SITE_KEY = isProd
  ? RECAPTCHA_SITE_KEY_PROD
  : RECAPTCHA_SITE_KEY_STAGING;
