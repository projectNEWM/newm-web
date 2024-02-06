import { isProd } from "@newm-web/env";

// Change the second value to enable Redux logging in development
export const enableReduxLogging = !isProd && false;

export const baseUrls: Record<string, string> = {
  cloudinary: "https://api.cloudinary.com/",
  lambda: isProd
    ? "https://aws.studio.newm.io/"
    : "https://aws.garage.newm.io/",
  newm: isProd ? "https://studio.newm.io/" : "https://garage.newm.io/",
};
