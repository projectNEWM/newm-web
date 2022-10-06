export const isProd = process.env.NODE_ENV === "production";

// Change this value to disable Redux logging in development
export const enableReduxLogging = !isProd && true;

export const baseUrls: Record<string, string> = {
  newm: isProd
    ? "https://studio.newm.io/"
    : "https://staging-newm-server.herokuapp.com/",
  phyrhose: isProd
    ? "https://api.phyrhose.io/"
    : "https://testnet.phyrhose.io/",
  cloudinary: "https://api.cloudinary.com/",
};
