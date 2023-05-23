import { ValidateDimensionsParams } from "./types";

/**
 * @returns a promise that resolves true if the provided image
 * has valid dimensions and throws an error if not.
 */
export const validateImageDimensions = ({
  imageUrl,
  minWidth,
  minHeight,
}: ValidateDimensionsParams) => {
  return new Promise<boolean>((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const hasValidDimensions =
        image.width >= minWidth && image.height >= minHeight;

      if (!hasValidDimensions) {
        reject(
          new Error(`Image must be at least ${minWidth} x ${minHeight} pixels.`)
        );
      }

      resolve(true);
    };

    image.src = imageUrl;
  });
};

/**
 * Create a base64 binary string representation of a file.
 */
export const getFileBinary = async (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const binaryStr = reader.result;
      resolve(binaryStr);
    };

    reader.readAsDataURL(file);
  });
};

interface ResizeOptions {
  height: number;
  width: number;
}

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

  const isCloudinaryUrl = url.split("/")[2] === "res.cloudinary.com";

  if (!isCloudinaryUrl) {
    return url;
  }

  const transformation = url.includes("upload/c_fit,w_5000,h_5000")
    ? "upload/c_fit,w_5000,h_5000"
    : "upload/";

  return url.replace(
    transformation,
    `upload/w_${options.width},h_${options.height},c_fill,q_auto,f_auto/`
  );
};
