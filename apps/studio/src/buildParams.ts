import { NODE_ENV, VITE_ENV } from "@newm-web/env";

export const isProd = NODE_ENV === "production" && VITE_ENV === "production";

// Change the second value to enable Redux logging in development
export const enableReduxLogging = !isProd && false;

export const baseUrls: Record<string, string> = {
  newm: isProd ? "https://studio.newm.io/" : "https://garage.newm.io/",
  cloudinary: "https://api.cloudinary.com/",
  lambda: isProd
    ? "https://aws.studio.newm.io/"
    : "https://aws.garage.newm.io/",
};
