import * as Sentry from "@sentry/react";
import { isProd } from "@newm-web/env";

const initializeSentry = () => {
  Sentry.init({
    dsn: "https://b98c0562df1b2b5d4c6bf708b91a561f@o1174944.ingest.sentry.io/4505967320956928",
    // For testing purposes you can set the environment to "debug"
    // to separate development and production errors
    environment: isProd ? "production" : "development",
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay({
        blockAllMedia: false,
        maskAllInputs: false,
        maskAllText: false,
      }),
    ],

    // Increase session capture rate specifically for sessions where errors occur.
    replaysOnErrorSampleRate: isProd ? 0.5 : 1.0,

    // For session replay: during development capture all sessions, but sample only a subset in production.
    replaysSessionSampleRate: isProd ? 0.05 : 1.0,

    // For performance monitoring: capture all transactions during development but limit in production.
    tracesSampleRate: isProd ? 0.1 : 1.0,
  });
};

export default initializeSentry;
