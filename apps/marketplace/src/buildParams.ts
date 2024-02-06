import { isProd } from "@newm-web/env";

// change the value to true to enable Redux logging in staging
const isReduxLoggingEnabledInStaging = false;

export const isReduxLoggingEnabled = !isProd && isReduxLoggingEnabledInStaging;
