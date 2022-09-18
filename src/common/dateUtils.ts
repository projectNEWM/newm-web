import { padStart } from "lodash";

export const displayCountdown = (end: Date, start: Date): string => {
  const diff = (end.getTime() - start.getTime()) / 1000;

  if (diff < 0) {
    return "00:00";
  }

  const minutes = Math.floor(diff / 60);
  const seconds = Math.floor(diff - minutes * 60);

  const minutesString = padStart(String(minutes), 2, "0");
  const secondsString = padStart(String(seconds), 2, "0");

  return `${minutesString}:${secondsString}`;
};
