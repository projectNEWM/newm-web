import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrls } from "buildParams";
import { executeRecaptcha } from "common";

const api = createApi({
  reducerPath: "phyrhoseApi",
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrls.phyrhose,
    prepareHeaders: async (headers, { endpoint }) => {
      const isLocalHost = location.hostname === "localhost";
      const isPurchaseOrder = endpoint === "createPurchaseOrder";

      if (!isLocalHost && isPurchaseOrder) {
        const recaptchaToken = await executeRecaptcha(endpoint);
        headers.set("g-recaptcha-response", recaptchaToken);
      }

      return headers;
    },
  }),

  endpoints: () => ({}),
});

export default api;
