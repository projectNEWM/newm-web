/**
 * Removes the trailing slash from a url path if one is present.
 */
export const removeTrailingSlash = (path: string) => {
  if (path[path.length - 1] === "/") {
    return path.slice(0, -1);
  }

  return path;
};

/**
 * Check if URL has http or https at the start of the URL
 */
const hasHttpOrHttpsPrefix = (url: string) => {
  return url.startsWith("http://") || url.startsWith("https://");
};

/**
 * Format URL with https at the start if missing http or https
 */
export const formatUrlHttps = (url: string) => {
  return hasHttpOrHttpsPrefix(url) ? url : `https://${url}`;
};
