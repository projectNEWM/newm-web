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
