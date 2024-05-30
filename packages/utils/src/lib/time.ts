import { padStart } from "lodash";
import { TimeRemaining } from "./types";

/**
 * Determines whether the current time has exceeded the given threshold in seconds from the specified time.
 *
 * @param {string} timeString - The starting time in ISO 8601 format (e.g., "2023-08-21T04:53:11.404215").
 * @param {number} secondsThreshold - The threshold time in seconds.
 * @returns {boolean}
 *
 * @throws {Error} Throws an error if the timeString is not a valid
 * date format or if the secondsThreshold is invalid.
 */
export const isMoreThanThresholdSecondsLater = (
  timeString: string,
  secondsThreshold: number
) => {
  const inputTime = Date.parse(timeString);

  // Validate input date
  if (isNaN(inputTime)) {
    throw new Error("Invalid date format");
  }

  // Validate secondsThreshold
  if (typeof secondsThreshold !== "number" || secondsThreshold <= 0) {
    throw new Error("Invalid time in seconds");
  }

  const MILLISECONDS_PER_SECOND = 1000;
  const currentTime = Date.now();
  const differenceInMilliseconds = currentTime - inputTime;
  const differenceInSeconds =
    differenceInMilliseconds / MILLISECONDS_PER_SECOND;

  return differenceInSeconds > secondsThreshold;
};

/**
 * Returns an object representing the time until the end date, including
 * days, hours, minutes, seconds, and the total milliseconds remaining.
 * Fields for larger time units are omitted if their values are zero.
 */
export const getTimeRemaining = (end: Date, start: Date): TimeRemaining => {
  const total = end.getTime() - start.getTime();
  const totalSeconds = total / 1000;

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return {
    days: days > 0 ? days.toString() : undefined,
    hours:
      hours > 0 || days > 0 ? hours.toString().padStart(2, "0") : undefined,
    minutes:
      minutes > 0 || hours > 0 || days > 0
        ? minutes.toString().padStart(2, "0")
        : undefined,
    seconds: seconds.toString().padStart(2, "0"),
    total,
  };
};
