import { NODE_ENV, VITE_ENV } from "@newm-web/env";

export const isProd = NODE_ENV === "production" && VITE_ENV === "production";
