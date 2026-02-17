import { isProd } from "@newm-web/env";

// change the value to true to enable Redux logging in staging
const isReduxLoggingEnabledInStaging = false;

export const isReduxLoggingEnabled = !isProd && isReduxLoggingEnabledInStaging;

export const baseUrls: Record<string, string> = {
  newm: isProd ? "https://studio.newm.io/" : "https://garage.newm.io/",
};
