export const isProd =
  import.meta.env.NODE_ENV === "production" &&
  import.meta.env.VITE_ENV === "production";

// Change the second value to enable Redux logging in development
export const enableReduxLogging = !isProd && false;

export const baseUrls: Record<string, string> = {
  newm: isProd ? "https://studio.newm.io/" : "https://garage.newm.io/",
  cloudinary: "https://api.cloudinary.com/",
  lambda: isProd ? "https://aws.studio.newm.io/" : "https://aws.garage.newm.io/"
};
