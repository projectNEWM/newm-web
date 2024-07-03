/**
 * Formats a numerical NEWM amount with the correct decimal
 * places and symbol.
 */
export const formatNewmAmount = (amount?: number, includeSymbol = true) => {
  if (!amount) return "";

  const withDecimals = amount.toFixed(3);
  const withoutTrailingZeroes = parseFloat(withDecimals)
  const withSymbol = includeSymbol ? `${withoutTrailingZeroes}`

  const formattedAmount = currency(amount, {
    // pattern: "# !",
    // precision: 3,
    // symbol: includeSymbol ? "Ɲ" : "",
  }).format();

  const withoutTrailingZeros = parseFloat(formattedAmount).toString();

  return withoutTrailingZeros;
};
