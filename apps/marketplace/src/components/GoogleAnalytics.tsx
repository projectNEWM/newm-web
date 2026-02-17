import { FunctionComponent } from "react";
import { GA_MARKETPLACE_ID, isProd } from "@newm-web/env";
import { GoogleAnalytics as NextJsGoogleAnalytics } from "@next/third-parties/google";

const GoogleAnalytics: FunctionComponent = () => {
  if (!isProd || !GA_MARKETPLACE_ID) return null;

  return <NextJsGoogleAnalytics gaId={ GA_MARKETPLACE_ID } />;
};

export default GoogleAnalytics;
