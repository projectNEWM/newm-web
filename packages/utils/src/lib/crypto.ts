import currency from "currency.js";

/**
 * Formats a numerical NEWM amount with the correct decimal
 * places and symbol.
 */
export const formatNewmAmount = (amount?: number, includeSymbol = true) => {
  if (!amount) return "";

  return currency(amount, {
    pattern: "# !",
    precision: 2,
    symbol: includeSymbol ? "Ɲ" : "",
  }).format();
};

/**
 * Formats a numerical USD amount to three decimal places
 * rather than the standard two, based on the exchange rate
 * for NEWM to USD.
 */
export const formatUsdAmount = (amount?: number) => {
  if (!amount) return "";

  return currency(amount, { precision: 3 }).format();
};
