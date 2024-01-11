import { FunctionComponent, useEffect } from "react";
import { VITE_GA_STUDIO_ID } from "@newm-web/env";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";
import { isProd } from "../buildParams";

if (isProd && VITE_GA_STUDIO_ID) {
  ReactGA.initialize(VITE_GA_STUDIO_ID);
}

const GoogleAnalytics: FunctionComponent = () => {
  const location = useLocation();

  /**
   * Send GA page view on each route change in production.
   */
  useEffect(() => {
    if (!isProd) return;

    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
    });
  }, [location]);

  return null;
};

export default GoogleAnalytics;
