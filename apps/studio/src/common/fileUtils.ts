import { isCloudinaryUrl } from "@newm-web/utils";
import { ResizeOptions } from "@newm-web/utils";

/**
 * Modifies image URL to the provided dimensions, if a cloudinary image is provided.
 *
 * @param {string | undefined} url - The original URL of image.
 * @param {ResizeOptions} options - The desired dimensions for the image. Default is { height: 40, width: 40 }.
 *
 * @returns {string} The URL of the resized image, or the original URL if resizing is not applicable.
 * Returns an empty string if the URL is undefined.
 */
export const getResizedAlbumCoverImageUrl = (
  url: string | undefined,
  options: ResizeOptions = { height: 40, width: 40 }
) => {
  if (!url) {
    return "";
  }

  if (!isCloudinaryUrl(url)) {
    return url;
  }

  const transformation = url.includes("upload/c_fit,w_5000,h_5000")
    ? "upload/c_limit,w_4000,h_4000"
    : "upload/";

  return url.replace(
    transformation,
    `upload/w_${options.width},h_${options.height},c_fill,q_auto,f_auto/`
  );
};
