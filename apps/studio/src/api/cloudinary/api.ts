import { createApi } from "@reduxjs/toolkit/query/react";
import { CloudinaryError, axiosBaseQuery } from "@newm-web/utils";
import { CloudinaryUploadParams, CloudinaryUploadResponse } from "./types";
import { baseUrls } from "../../buildParams";
import { setToastMessage } from "../../modules/ui";

const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: baseUrls.cloudinary,
  }),
  endpoints: (build) => ({
    uploadImage: build.mutation<
      CloudinaryUploadResponse,
      CloudinaryUploadParams
    >({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          let message = "There was an error uploading your image";

          // Replace generic message with API error message if present
          if (error && typeof error === "object" && "error" in error) {
            const apiError = error as CloudinaryError;
            const apiErrorMessage = apiError.error.data.error.message;

            if (apiErrorMessage) {
              message = apiErrorMessage;
            }
          }

          dispatch(
            setToastMessage({
              message,
              severity: "error",
            })
          );
        }
      },

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
