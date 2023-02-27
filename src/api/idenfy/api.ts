import { Buffer } from "buffer";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrls } from "buildParams";
import { IdenfyTokenRequest, IdenfyTokenResponse } from "./types";

const base64AuthString = Buffer.from(
  `${process.env.REACT_APP_IDENFY_API_KEY}:${process.env.REACT_APP_IDENFY_API_SECRET}`
).toString("base64");

const api = createApi({
  reducerPath: "idenfyApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrls.idenfy }),
  endpoints: (build) => ({
    requestVerificationToken: build.mutation<
      IdenfyTokenResponse,
      IdenfyTokenRequest
    >({
      query: (body) => ({
        url: "api/v2/token",
        method: "POST",
        body,
        headers: {
          Authorization: `Basic ${base64AuthString}`,
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export default api;
