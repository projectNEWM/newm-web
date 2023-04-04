import { ValidateDimensionsParams } from "./types";

/**
 * @returns a promise that resolves true if the provided image
 * has valid dimensions and throws an error if not.
 */
export const validateImageDimensions = ({
  imageUrl,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
}: ValidateDimensionsParams) => {
  return new Promise<boolean>((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const hasValidMinDimensions =
        minWidth && minHeight
          ? image.width >= minWidth && image.height >= minHeight
          : true;

      const hasValidMaxDimensions =
        maxWidth && maxHeight
          ? image.width <= maxWidth && image.height <= maxHeight
          : true;

      if (!hasValidMinDimensions) {
        reject(
          new Error(`Image must be at least ${minWidth} x ${minHeight} pixels.`)
        );
      }

      if (!hasValidMaxDimensions) {
        reject(
          new Error(
            `Image must be no larger than ${maxWidth} x ${maxHeight} pixels.`
          )
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
