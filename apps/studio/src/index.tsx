import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import initializeSentry from "./sentryConfig";

// redirect from default firebase urls
if (window.location.hostname.includes("newm-studio")) {
  window.location.replace("https://newm.studio");
}

initializeSentry();

const isMac = navigator.userAgent.includes("Mac");

if (!isMac) {
  document.documentElement.classList.add("modify-scrollbar");
}

// Get a reference to the root DOM node
const rootDomNode = document.getElementById("root") as HTMLElement;

if (rootDomNode) {
  // Create a root
  const root = ReactDOM.createRoot(rootDomNode);

  // Render your application
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
