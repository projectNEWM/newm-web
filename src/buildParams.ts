export const isProd = process.env.NODE_ENV === "production";

// Change this value to disable Redux logging in development
export const enableReduxLogging = !isProd && true;

// TODO: Update with NEWM server production url host
export const baseUrls: Record<string, string> = {
  newm: isProd
    ? "https://staging-newm-server.herokuapp.com/"
    : "https://staging-newm-server.herokuapp.com/",
  cloudinary: "https://api.cloudinary.com/",
};
