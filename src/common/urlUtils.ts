/**
 * Removes the trailing slash from a url path if one is present.
 */
export const removeTrailingSlash = (path: string) => {
  if (path[path.length - 1] === "/") {
    return path.slice(0, -1);
  }

  return path;
};

// check if URL has http or https at the start
const isHttpAtStart = (url: string) => {
  return url.startsWith("http://") || url.startsWith("https://");
};

// format URL with https at the start
export function formatUrlHttps(url: string) {
  return !isHttpAtStart(url) ? `https://${url}` : url;
}
