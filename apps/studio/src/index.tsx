import React from "react";
import ReactDOM from "react-dom/client";
import "global.css";
import moment from "moment/min/moment-with-locales";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { LAUNCHDARKLY_CLIENT_ID } from "@newm-web/env";
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

asyncWithLDProvider({
  clientSideID: LAUNCHDARKLY_CLIENT_ID,
  context: ldContext,
  timeout: 5,
}).then((StudioLDProvider) => {
  const rootDomNode = document.getElementById("root") as HTMLElement;
  if (rootDomNode) {
    ReactDOM.createRoot(rootDomNode).render(
      <React.StrictMode>
        <StudioLDProvider>
          <App />
        </StudioLDProvider>
      </React.StrictMode>
    );
  }
});

// * If you want to start measuring performance in your app, pass a function
// * to log results (for example: reportWebVitals(console.log))
// * or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
