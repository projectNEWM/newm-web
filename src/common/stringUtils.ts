import { padEnd } from "lodash";

export const removeFirstCharIfNumber = (val: string) => {
  return val.replace(/^[0-9]/, "");
};

export const displayUsd = (value: number): string => {
  const parts = String(value).split(".");

  const dollars = parts[0];
  const cents = parts[1];

  if (!cents) {
    return `${dollars}.00`;
  }

  const paddedCents = padEnd(cents, 2, "0");

  return `${dollars}.${paddedCents}`;
};
