/**
 * Removes the trailing slash from a url path if one is present.
 */
export const removeTrailingSlash = (path: string) => {
  if (path[path.length - 1] === "/") {
    return path.slice(0, -1);
  }

  return path;
};
