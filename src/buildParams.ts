export const isProd = process.env.node_env === "production";

// Change this value to disable Redux logging in development
export const enableReduxLogging = true;

// TODO: Update this with murs project production ID
export const mursProjectId = isProd ? 12 : 6;

// 1 = Mainnet, 0 = Testnet
export const networkMode = isProd ? 1 : 0;

// TODO: Update these with production url hosts
export const baseUrls: Record<string, string> = {
  newm: isProd
    ? "https://staging-newm-server.herokuapp.com/"
    : "https://staging-newm-server.herokuapp.com/",
  phyrhose: isProd
    ? "https://testnet.phyrhose.io/"
    : "https://testnet.phyrhose.io/",
  alphaAdvantage: isProd
    ? "https://www.alphavantage.co/"
    : "https://www.alphavantage.co/",
  cloudinary: isProd
    ? "https://api.cloudinary.com/"
    : "https://api.cloudinary.com/",
};
