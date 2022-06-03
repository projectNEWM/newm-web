import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CloudinaryUploadParams, CloudinaryUploadResponse } from "./types";

const api = createApi({
  reducerPath: "cloudinaryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.cloudinary.com/" }),
  endpoints: (build) => ({
    uploadImage: build.mutation<
      CloudinaryUploadResponse,
      CloudinaryUploadParams
    >({
      query: (body) => ({
        url: "v1_1/newm/image/upload",
        method: "POST",
        body,
      }),
    }),
  }),
});

export default api;
