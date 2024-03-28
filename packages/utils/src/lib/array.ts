import { useMemo } from "react";

/**
 * This hook extracts the specified property from an array of items.
 * Each item is expected to have the specified property of type string.
 *
 * @param {T[]} items - An array of items to extract property from.
 * @param {K} property - The name of the property to extract.
 * @param {boolean} shouldSort - Whether the result should be sorted.
 * @return {string[]} An array of extracted property values.
 *
 * @template T
 * @typedef {object} T
 * @property {string} K
 */
export const useExtractProperty = <
  T extends Record<K, string>,
  K extends keyof T
>(
  items: T[],
  property: K,
  shouldSort = true
): T[K][] => {
  return useMemo(() => {
    const extracted = items.map((item) => item[property]);
    return shouldSort
      ? extracted.sort((a, b) => a.localeCompare(b))
      : extracted;
  }, [items, property, shouldSort]);
};

/**
 * Checks if an array includes a specific value, ignoring case sensitivity.
 */
export const isValueInArray = (
  value: string,
  array: readonly string[]
): boolean => {
  const lowerCaseValue = value.toLowerCase();

  return array.some((item) => item.toLowerCase() === lowerCaseValue);
};
