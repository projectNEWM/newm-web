/**
 * Formats a price string to a specified number of decimal places.
 * If the input price is undefined or cannot be parsed as a number,
 * it defaults to 0. The function returns the formatted price as a string.
 *
 * @param {string} [price] - The price to be formatted. Optional.
 * @param {number} [decimals=2] - The number of decimal places to format the price to. Defaults to 2.
 * @returns {string} - The formatted price.
 */
export const formatPriceToDecimal = (price?: string, decimals = 2): string => {
  const numericPrice = price ? parseFloat(price) : 0;

  return numericPrice.toFixed(decimals);
};
