export const COLLABORATOR_FEE_IN_ADA = 1.3;
export const MINTING_FEE_IN_ADA = 6;
export const NEWM_SUPPORT_EMAIL = "support@newm.io";

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
