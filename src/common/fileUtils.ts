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
