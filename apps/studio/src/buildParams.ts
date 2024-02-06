import { isProd } from "@newm-web/env";

// change the value to true to enable Redux logging in staging
const isReduxLoggingEnabledInStaging = false;

export const isReduxLoggingEnabled = !isProd && isReduxLoggingEnabledInStaging;

export const baseUrls: Record<string, string> = {
  cloudinary: "https://api.cloudinary.com/",
  lambda: isProd
    ? "https://aws.studio.newm.io/"
    : "https://aws.garage.newm.io/",
  newm: isProd ? "https://studio.newm.io/" : "https://garage.newm.io/",
};
