export const isProd = process.env.node_env === "production";
export const isMainNet = process.env.REACT_APP_NETWORK_MODE !== "0";

// Change this value to disable Redux logging in development
export const enableReduxLogging = true;

// TODO: Update with production / MainNet url hosts
export const baseUrls: Record<string, string> = {
  newm: isProd
    ? "https://staging-newm-server.herokuapp.com/"
    : "https://staging-newm-server.herokuapp.com/",
  phyrhose: isMainNet
    ? "https://testnet.phyrhose.io/"
    : "https://testnet.phyrhose.io/",
  alphaAdvantage: "https://www.alphavantage.co/",
  cloudinary: "https://api.cloudinary.com/",
};
