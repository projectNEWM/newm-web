import { FunctionComponent, useEffect } from "react";
import { GA_STUDIO_ID, isProd } from "@newm-web/env";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

if (isProd && GA_STUDIO_ID) {
  ReactGA.initialize(GA_STUDIO_ID);
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
