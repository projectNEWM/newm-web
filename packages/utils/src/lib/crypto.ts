import currency from "currency.js";

export const formatNewmAmount = (amount?: number, includeSymbol = true) => {
  if (!amount) return "";

  return currency(amount, {
    pattern: "# !",
    precision: 1,
    symbol: includeSymbol ? "Ɲ" : "",
  }).format();
};
