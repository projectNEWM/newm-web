export const isProd = process.env.NODE_ENV === "production";

// Change this value to disable Redux logging in development
export const enableReduxLogging = !isProd && true;

// TODO: Update with NEWM server production url host
export const baseUrls: Record<string, string> = {
  newm: isProd ? "https://studio.newm.io" : "https://garage.newm.io",
  cloudinary: "https://api.cloudinary.com/",
};
