export const isProd = process.env.node_env === "production";

// Change this value to disable Redux logging in development
export const enableReduxLogging = true;

// TODO: Update with production url hosts
export const baseUrls: Record<string, string> = {
  newm: isProd
    ? "https://staging-newm-server.herokuapp.com/"
    : "https://staging-newm-server.herokuapp.com/",
  phyrhose: isProd
    ? "https://testnet.phyrhose.io/"
    : "https://testnet.phyrhose.io/",
  alphaAdvantage: "https://www.alphavantage.co/",
  cloudinary: "https://api.cloudinary.com/",
};
