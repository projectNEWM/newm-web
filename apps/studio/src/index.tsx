import React from "react";
import ReactDOM from "react-dom/client";
import "global.css";
import moment from "moment/min/moment-with-locales";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { LAUNCHDARKLY_CLIENT_ID } from "@newm-web/env";
import theme from "@newm-web/theme";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import initializeSentry from "./sentryConfig";
import loadReferralHeroScript from "./referralHeroConfig";

const ldContext = {
  anonymous: true,
  kind: "user",
  name: "Studio Guest",
};

// * Redirect from default firebase urls.
if (window.location.hostname.includes("newm-studio")) {
  window.location.replace("https://newm.studio");
}

initializeSentry();
loadReferralHeroScript();

const browserLocale = navigator.language.toLowerCase();
moment.locale(browserLocale);

const isMac = navigator.userAgent.includes("Mac");

if (!isMac) {
  document.documentElement.classList.add("modify-scrollbar");
}

const rootDomNode = document.getElementById("root") as HTMLElement;

if (rootDomNode) {
  const root = ReactDOM.createRoot(rootDomNode);

  root.render(
    <React.StrictMode>
      <div
        style={ {
          backgroundColor: theme.colors.black,
          height: "100vh",
          margin: 0,
          padding: 0,
          width: "100vw",
        } }
      />
    </React.StrictMode>
  );

  asyncWithLDProvider({
    clientSideID: LAUNCHDARKLY_CLIENT_ID,
    context: ldContext,
    timeout: 5,
  })
    .then((StudioLDProvider) => {
      root.render(
        <React.StrictMode>
          <StudioLDProvider>
            <App />
          </StudioLDProvider>
        </React.StrictMode>
      );
    })
    .catch((error) => {
      // * Keep this fallback: asyncWithLDProvider rarely rejects, but if it does we still render.
      // eslint-disable-next-line no-console
      console.error("Failed to initialize LaunchDarkly:", error);

      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    });
}

// * If you want to start measuring performance in your app, pass a function
// * to log results (for example: reportWebVitals(console.log))
// * or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
