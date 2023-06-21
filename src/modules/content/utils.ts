import { Extractable } from "./types";

/**
 * Extracts the 'name' property from an array of items.
 * Each item is expected to have a 'name' property of type string.
 *
 * @param {T[]} items - An array of items to extract names from.
 * @return {string[]} An array of extracted names.
 *
 * @template T
 * @typedef {object} T
 * @property {string} name
 */
export const extractNames = <T extends Extractable>(items: T[]): string[] =>
  items.map((item) => item.name);
