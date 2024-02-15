interface NextImageImport {
  blurDataURL?: string;
  height?: number;
  src: string;
  width?: number;
}

type ImageImport = NextImageImport | string;

/**
 * Extracts the image source URL from an image import,
 * accommodating both Next.js optimized images and standard string paths.
 * @returns {string} The image source URL, suitable for use in the `src`
 * attribute of an `<img>` tag or the `src` property of a Next.js `Image` component.
 * This is helpful to use in shared components that can be used in both Next.js and React apps.
 */
export const getImageSrc = (imageImport: ImageImport) => {
  // Next.js app: Use the `src` property
  if (typeof imageImport === "object" && "src" in imageImport) {
    return imageImport.src;
  }
  // React app: Direct string path
  return imageImport;
};
