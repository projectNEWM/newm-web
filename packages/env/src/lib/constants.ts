import { ENV, NODE_ENV } from "./env";

export const isProd = NODE_ENV === "production" && ENV === "production";
