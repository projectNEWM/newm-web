/**
 * @returns a promise with a true or false value depending
 * on whether the image has the correct dimensions.
 */
export const validateImageDimensions = (
  imageUrl: string,
  minWidth: number,
  minHeight: number
) => {
  return new Promise<boolean>((resolve) => {
    const image = new Image();
    image.onload = () => {
      resolve(image.width >= minWidth && image.height >= minHeight);
    };

    image.src = imageUrl;
  });
};

/**
 * Create a base64 binary string representation of a file.
 */
export const getFileBinary = async (file: File) => {
  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const binaryStr = reader.result;
      resolve(binaryStr);
    };

    reader.readAsDataURL(file);
  });
};
