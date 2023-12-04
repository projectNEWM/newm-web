import { createApi } from "@reduxjs/toolkit/query/react";
import { baseUrls } from "../../buildParams";
import { axiosBaseQuery } from "../../api/utils";
import { CloudinaryUploadParams, CloudinaryUploadResponse } from "./types";

const api = createApi({
  reducerPath: "cloudinaryApi",
  baseQuery: axiosBaseQuery({
    baseUrl: baseUrls.cloudinary,
  }),
  endpoints: (build) => ({
    uploadImage: build.mutation<
      CloudinaryUploadResponse,
      CloudinaryUploadParams
    >({
      query: ({ onUploadProgress, ...body }) => ({
        url: "v1_1/newm/image/upload",
        method: "POST",
        body,
        onUploadProgress,
      }),
    }),
  }),
});

export default api;
