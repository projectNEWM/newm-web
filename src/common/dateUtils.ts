import { padStart } from "lodash";

/**
 * Returns a string displaying the time until the end date. E.g. "1:12:40:32".
 * Omits a section if the time i
 */
export const displayCountdown = (end: Date, start: Date): string => {
  const diff = (end.getTime() - start.getTime()) / 1000;

  const days = Math.floor(diff / (3600 * 24));
  const hours = Math.floor((diff % (3600 * 24)) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = Math.floor(diff % 60);

  const daysString = String(days);
  const hoursString = padStart(String(hours), 2, "0");
  const minutesString = padStart(String(minutes), 2, "0");
  const secondsString = padStart(String(seconds), 2, "0");

  if (days > 0) {
    return `${daysString}:${hoursString}:${minutesString}:${secondsString}`;
  }

  if (days === 0) {
    return `${hoursString}:${minutesString}:${secondsString}`;
  }

  return `${minutesString}:${secondsString}`;
};
