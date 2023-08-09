import { useMemo } from "react";

/**
 * Extracts the specified property from an array of items.
 * Each item is expected to have the specified property of type string.
 *
 * @param {T[]} items - An array of items to extract property from.
 * @param {K} property - The name of the property to extract.
 * @return {string[]} An array of extracted property values.
 *
 * @template T
 * @typedef {object} T
 * @property {string} K
 */
export const extractProperty = <T, K extends keyof T>(
  items: T[],
  property: K
): T[K][] => items.map((item) => item[property]);

export const useExtractProperty = <T, K extends keyof T>(
  items: T[],
  property: K
): T[K][] => {
  const memoized = useMemo(
    () => extractProperty(items, property),
    [items, property]
  );

  return memoized;
};
