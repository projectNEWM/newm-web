import { padStart } from "lodash";
import { TimeRemaining } from "./types";

/**
 * Returns a string displaying the time until the end date. E.g. "1:12:40:32".
 * Omits a section if the remaining time doesn't include that value. E.g.
 * "12:30:15" if time is less than a day.
 */
export const getTimeRemaining = (end: Date, start: Date): TimeRemaining => {
  const diff = (end.getTime() - start.getTime()) / 1000;

  const days = Math.floor(diff / (3600 * 24));
  const hours = Math.floor((diff % (3600 * 24)) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = Math.floor(diff % 60);

  const daysString = String(days);
  const hoursString =
    days <= 0 ? String(hours) : padStart(String(hours), 2, "0");
  const minutesString =
    hours <= 0 ? String(minutes) : padStart(String(minutes), 2, "0");
  const secondsString =
    hours <= 0 && minutes <= 0
      ? String(seconds)
      : padStart(String(seconds), 2, "0");

  return {
    days: days <= 0 ? undefined : daysString,
    hours: days <= 0 && hours <= 0 ? undefined : hoursString,
    minutes:
      days <= 0 && hours <= 0 && minutes <= 0 ? undefined : minutesString,
    seconds:
      days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0
        ? "0"
        : secondsString,
  };
};
