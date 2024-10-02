/**
 * Formats a given price string to a specified number of decimal places.
 * If the input price is a valid number string, it returns the price formatted
 * to the specified number of decimal places. If the input is an invalid number
 * string, it returns NaN.
 */
export const formatPriceToDecimal = (
  price = "",
  decimals = 2
): string | number => {
  const parsedPrice = parseFloat(price);

  return isNaN(parsedPrice) ? NaN : parsedPrice.toFixed(decimals);
};

/**
 * Sorts function to order an array of strings in ascending
 * alphabetical order, ignoring capitalization.
 */
export const alphabeticalAsc = (a?: string, b?: string): number => {
  if (a === undefined) return -1;
  if (b === undefined) return 1;

  return a.toLowerCase().localeCompare(b.toLowerCase());
};
