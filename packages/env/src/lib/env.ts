/**
 * References the correct public environment variable.
 */
const getAppEnvVar = (name: string): string => {
  switch (name) {
    case "APPLE_CLIENT_ID":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_APPLE_CLIENT_ID ?? ""
        : import.meta.env.VITE_APPLE_CLIENT_ID;
    case "GOOGLE_CLIENT_ID":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""
        : import.meta.env.VITE_GOOGLE_CLIENT_ID;
    case "GA_STUDIO_ID":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_GA_STUDIO_ID ?? ""
        : import.meta.env.VITE_GA_STUDIO_ID;
    case "GA_MARKETPLACE_ID":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_GA_MARKETPLACE_ID ?? ""
        : import.meta.env.VITE_GA_MARKETPLACE_ID;
    case "RECAPTCHA_SITE_KEY_STAGING":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_STAGING ?? ""
        : import.meta.env.VITE_RECAPTCHA_SITE_KEY_STAGING;
    case "RECAPTCHA_SITE_KEY_PROD":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_PROD ?? ""
        : import.meta.env.VITE_RECAPTCHA_SITE_KEY_PROD;
    case "DEXHUNTER_MARKETPLACE_PARTNER_CODE":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_DEXHUNTER_MARKETPLACE_PARTNER_CODE ?? ""
        : import.meta.env.VITE_DEXHUNTER_MARKETPLACE_PARTNER_CODE;
    case "DEXHUNTER_TOOLS_PARTNER_CODE":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_DEXHUNTER_TOOLS_PARTNER_CODE ?? ""
        : import.meta.env.VITE_DEXHUNTER_TOOLS_PARTNER_CODE;
    case "DEXHUNTER_STUDIO_PARTNER_CODE":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_DEXHUNTER_STUDIO_PARTNER_CODE ?? ""
        : import.meta.env.VITE_DEXHUNTER_STUDIO_PARTNER_CODE;
    case "LAUNCHDARKLY_CLIENT_ID_STAGING":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID_STAGING ?? ""
        : import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID_STAGING;
    case "LAUNCHDARKLY_CLIENT_ID_PROD":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID_PROD ?? ""
        : import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID_PROD;
    case "REFERRALHERO_TRACKING_ID":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_REFERRALHERO_TRACKING_ID ?? ""
        : import.meta.env.VITE_REFERRALHERO_TRACKING_ID;
    case "REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID_STAGING":
      return typeof process !== "undefined"
        ? process.env
            .NEXT_PUBLIC_REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID_STAGING ??
            ""
        : import.meta.env
            .VITE_REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID_STAGING;
    case "REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID_PROD":
      return typeof process !== "undefined"
        ? process.env
            .NEXT_PUBLIC_REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID_PROD ?? ""
        : import.meta.env.VITE_REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID_PROD;
    case "ENV":
      return typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_ENV ?? ""
        : import.meta.env.VITE_ENV;
    default:
      return "";
  }
};

export const APPLE_CLIENT_ID = getAppEnvVar("APPLE_CLIENT_ID");
export const GOOGLE_CLIENT_ID = getAppEnvVar("GOOGLE_CLIENT_ID");
export const GA_STUDIO_ID = getAppEnvVar("GA_STUDIO_ID");
export const GA_MARKETPLACE_ID = getAppEnvVar("GA_MARKETPLACE_ID");
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

const LAUNCHDARKLY_CLIENT_ID_PROD = getAppEnvVar("LAUNCHDARKLY_CLIENT_ID_PROD");
const LAUNCHDARKLY_CLIENT_ID_STAGING = getAppEnvVar(
  "LAUNCHDARKLY_CLIENT_ID_STAGING"
);
export const LAUNCHDARKLY_CLIENT_ID = isProd
  ? LAUNCHDARKLY_CLIENT_ID_PROD
  : LAUNCHDARKLY_CLIENT_ID_STAGING;

export const REFERRALHERO_TRACKING_ID = getAppEnvVar(
  "REFERRALHERO_TRACKING_ID"
);

const REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID_PROD = getAppEnvVar(
  "_REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID_PROD"
);
const REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID_STAGING = getAppEnvVar(
  "REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID_STAGING"
);
export const REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID = isProd
  ? REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID_PROD
  : REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID_STAGING;
