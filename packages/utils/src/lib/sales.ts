import { ApiSale, Sale } from "@newm-web/types";
import { Currency } from "./crypto";

/**
 * Full ownership stream tokens, used for calculating ownership percentage.
 * This represents 100% ownership of a song.
 */
export const FULL_OWNERSHIP_STREAM_TOKENS = 100000000;

/**
 * Conversion factor for converting between NEWM values.
 */
export const LOVELACE_CONVERSION = 1000000;

/**
 * Standard transaction fee.
 */
export const TRANSACTION_FEE_IN_ADA = 0.4;

/**
 * Conversion factor for converting USD to required decimal places for back-end.
 */
export const USD_CONVERSION = 1000000000000;

/**
 * Creates a sale object from the sale API object with
 * the song.parentalAdvisory string field replaced with
 * a song.isExplicit boolean field.
 */
export const transformApiSale = (apiSale: ApiSale): Sale => {
  const {
    song: { parentalAdvisory, ...song },
    ...sale
  } = apiSale;

  const conversionFactor =
    sale.costPolicyId === Currency.USD.costPolicyId
      ? USD_CONVERSION
      : LOVELACE_CONVERSION;

  return {
    ...sale,
    costAmount: sale.costAmount / conversionFactor,
    costAmountNewm: parseFloat(sale.costAmountNewm),
    costAmountUsd: parseFloat(sale.costAmountUsd),
    song: {
      ...song,
      isExplicit: parentalAdvisory === "Explicit",
    },
  };
};

/**
 * Calculates the ownership percentage based on the number of tokens given and
 * the pre-defined number of tokens that equals to 100% ownership.
 *
 * @param {number} tokens - The number of tokens owned.
 * @returns {number} The ownership percentage relative to full ownership.
 */
export const calculateOwnershipPerecentage = (tokens: number) => {
  return (tokens / FULL_OWNERSHIP_STREAM_TOKENS) * 100;
};

/**
 * Formats a given percentage value. Smaller values are shown with more decimal places
 * to preserve their significance, whereas larger values are displayed with fewer decimals.
 */
export const formatPercentageAdaptive = (percentage: number) => {
  let formattedPercentage;

  if (percentage < 0.01) {
    // Very small percentages display with more precision
    formattedPercentage = percentage.toFixed(8);
  } else if (percentage < 1) {
    // Small but not tiny percentages
    formattedPercentage = percentage.toFixed(4);
  } else {
    // Larger percentages
    formattedPercentage = percentage.toFixed(2);
  }

  return parseFloat(formattedPercentage);
};
