/**
 * Converts milliseconds into a song format (m:ss).
 *
 * @param {number} milliseconds - The time in milliseconds.
 *
 * @returns {string} The time in 'm:ss' format.
 */
export const convertMillisecondsToSongFormat = (
  milliseconds: number
): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
