export const isProd =
  process.env.NODE_ENV === "production" &&
  process.env.REACT_APP_ENV === "production";

// Change this value to disable Redux logging in development
export const enableReduxLogging = !isProd && true;

export const baseUrls: Record<string, string> = {
  newm: isProd ? "https://studio.newm.io/" : "https://garage.newm.io/",
  cloudinary: "https://api.cloudinary.com/",
  lambda: isProd
    ? "https://aws.studio.newm.io/generate-artist-agreement"
    : "https://aws.garage.newm.io/generate-artist-agreement",
};
