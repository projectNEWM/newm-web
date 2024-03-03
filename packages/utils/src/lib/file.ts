import { ResizeImageOptions, ValidateDimensionsParams } from "./types";

/**
 * Checks if the aspect ratio of an image is 1:1.
 * @param {string} imageUrl - The URL of the image.
 * @returns {Promise<boolean>} True if the image is square and false otherwise.
 */
export const validateAspectRatioOneToOne = async (
  imageUrl: string
): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const isOneToOneRatio = image.width === image.height;

      if (!isOneToOneRatio) {
        reject(new Error("Image must be 1:1 aspect ratio"));

        URL.revokeObjectURL(image.src);
      }
      resolve(true);
    };

    image.onerror = () => reject("Failed to load image");

    image.src = imageUrl;
  });
};

/**
 * Checks if the dimensions of an image are at least the provided minimum dimensions.
 * @param {ValidateDimensionsParams} params - The parameters for the function.
 * @returns a promise that resolves true if the provided image
 * has valid dimensions and throws an error if not.
 */
export const validateMinImageDimensions = ({
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

        URL.revokeObjectURL(image.src);
      }

      resolve(true);
    };

    image.onerror = () => reject("Failed to load image");

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

export const isCloudinaryUrl = (url: string) => {
  return url.split("/")[2] === "res.cloudinary.com";
};

/**
 * Replaces any resize params present in a cloudinary image
 * url with new width and height params. If no resize params
 * are present, resize params are added in correct place.
 *
 * @param url
 * @param options
 * @returns
 */
export const resizeCloudinaryImage = (
  url = "",
  options: ResizeImageOptions = { height: 40, width: 40 }
) => {
  if (!isCloudinaryUrl(url)) return url;

  const renderOptions = url.match(/upload\/(.*?)\//);
  if (!renderOptions) return url;

  const matched = renderOptions[0];
  // if no resize params, captured text in url wil match v123...
  const isNotResizeParams = matched.match(/v\d+/);
  const textToReplace = isNotResizeParams ? "upload/" : matched;

  return url.replace(
    textToReplace,
    `upload/w_${options.width},h_${options.height},c_fill,q_auto,f_auto/`
  );
};
