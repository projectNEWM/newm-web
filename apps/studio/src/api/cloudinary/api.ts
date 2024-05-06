import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@newm-web/utils";
import { CloudinaryUploadParams, CloudinaryUploadResponse } from "./types";
import { baseUrls } from "../../buildParams";

const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: baseUrls.cloudinary,
  }),
  endpoints: (build) => ({
    uploadImage: build.mutation<
      CloudinaryUploadResponse,
      CloudinaryUploadParams
    >({
      query: ({ onUploadProgress, ...body }) => ({
        body,
        method: "POST",
        onUploadProgress,
        url: "v1_1/newm/image/upload",
      }),
    }),
  }),
  reducerPath: "cloudinaryApi",
});

export default api;
