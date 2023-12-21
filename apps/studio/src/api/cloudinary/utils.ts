import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { getFileBinary } from "@newm-web/utils";
import { CloudinaryUploadOptions } from "./types";
import { cloudinaryApi } from "../../api";
import { songApi } from "../../modules/song";
import { OnUploadProgress } from "../../api/types";

/**
 * Uploads an image to Cloudinary. Returns the response if
 * successful and throws an error if not.
 */
export const uploadToCloudinary = async (
  image: File,
  params: CloudinaryUploadOptions,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  onUploadProgress?: OnUploadProgress
): Promise<string> => {
  // TODO: Delete previously saved image from cloudinary after successfully updating it.

  const signatureResp = await dispatch(
    songApi.endpoints.getCloudinarySignature.initiate(params)
  );

  if ("error" in signatureResp || !("data" in signatureResp)) {
    throw new Error("Error fetching secure Cloudinary signature");
  }

  const { apiKey, signature, timestamp } = signatureResp.data;

  const imageBinaryStr = await getFileBinary(image);

  // upload image to cloudinary
  const cloudinaryResp = await dispatch(
    cloudinaryApi.endpoints.uploadImage.initiate({
      ...params,
      api_key: apiKey,
      file: imageBinaryStr,
      onUploadProgress,
      signature,
      timestamp,
    })
  );

  if ("error" in cloudinaryResp || !("data" in cloudinaryResp)) {
    throw new Error("Error uploading image to cloudinary");
  }

  return cloudinaryResp.data.eager
    ? cloudinaryResp.data.eager[0].secure_url
    : cloudinaryResp.data.secure_url;
};
