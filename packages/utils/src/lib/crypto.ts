import currency from "currency.js";

/**
 * Formats a numerical NEWM amount with the correct decimal
 * places and symbol.
 */
export const formatNewmAmount = (amount?: number, includeSymbol = true) => {
  if (!amount) return "";

  return currency(amount, {
    pattern: "# !",
    precision: 1,
    symbol: includeSymbol ? "Ɲ" : "",
  }).format();
};
