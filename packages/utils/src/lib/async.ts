/**
 * Async function that waits for the specified number of milliseconds
 * @param ms number of miliseconds to wait
 * @returns a promise that resolves after the specified time
 */
export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms + 2));
};
