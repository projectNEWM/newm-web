import { isProd } from "@newm-web/env";
import currency from "currency.js";
import { Currency as CurrencyType } from "@newm-web/types";
import { LOVELACE_CONVERSION, USD_CONVERSION } from "./sales";

export const NEWM_POLICY_ID = isProd
  ? "682fe60c9918842b3323c43b5144bc3d52a23bd2fb81345560d73f63"
  : "769c4c6e9bc3ba5406b9b89fb7beb6819e638ff2e2de63f008d5bcff";
export const NEWM_ASSET_NAME = isProd ? "4e45574d" : "744e45574d";

interface FormatCurrencyOptions {
  readonly includeCurrencySymbol?: boolean;
  readonly includeEstimateSymbol?: boolean;
  readonly precision?: number;
  readonly returnZeroValueForNullish?: boolean;
}

/**
 * Formats a numerical NEWM amount with three decimal places and the correct symbol.
 * @param amount - The amount to format
 * @param options - Format options
 * @param options.precision - Number of decimal places, if not explicitly set, amount of 0 will be "Ɲ0" (default: 3)
 * @param options.includeCurrencySymbol - Include currency symbol "Ɲ" (default: true)
 * @param options.includeEstimateSymbol - Include estimate symbol "≈" (default: false)
 * @param options.returnZeroValueForNullish - Return "Ɲ0" instead of "N/A" (default: true)
 */
export const formatNewmAmount = (
  amount?: number,
  options?: FormatCurrencyOptions
) => {
  const {
    includeCurrencySymbol = true,
    includeEstimateSymbol = false,
    precision = 3,
    returnZeroValueForNullish = true,
  } = options ?? {};

  const isPrecisionExplicit = options?.precision !== undefined;

  if (!amount && amount !== 0) {
    if (returnZeroValueForNullish) {
      return "Ɲ0";
    } else {
      return "N/A";
    }
  }

  if (!isPrecisionExplicit && amount === 0) {
    return includeCurrencySymbol ? "Ɲ0" : "0";
  }

  if (precision === 3 && amount < 0.001 && amount > 0) {
    return "< 0.001 Ɲ";
  }

  const formattedAmount = currency(amount, {
    pattern: "!#",
    precision,
    symbol: includeCurrencySymbol ? "Ɲ" : "",
  }).format();

  return includeEstimateSymbol ? `≈ ${formattedAmount}` : formattedAmount;
};

/**
 * Formats a numerical ADA amount with the correct decimal places and symbol.
 * @param amount - The amount to format
 * @param options - Format options
 * @param options.precision - Number of decimal places, if not explicitly set, amount of 0 will be "₳0" (default: 2)
 * @param options.includeCurrencySymbol - Include currency symbol "₳" (default: true)
 * @param options.includeEstimateSymbol - Include estimate symbol "≈" (default: false)
 * @param options.returnZeroValueForNullish - Return "₳0" instead of "N/A" (default: true)
 */
export const formatAdaAmount = (
  amount?: number,
  options?: FormatCurrencyOptions
) => {
  const {
    includeCurrencySymbol = true,
    includeEstimateSymbol = false,
    precision = 2,
    returnZeroValueForNullish = true,
  } = options ?? {};

  const isPrecisionExplicit = options?.precision !== undefined;

  if (!amount && amount !== 0) {
    if (returnZeroValueForNullish) {
      return "₳0";
    } else {
      return "N/A";
    }
  }

  if (!isPrecisionExplicit && amount === 0) {
    return includeCurrencySymbol ? "₳0" : "0";
  }

  const formattedAmount = currency(amount, {
    pattern: "!#",
    precision,
    symbol: includeCurrencySymbol ? "₳" : "",
  }).format();

  return includeEstimateSymbol ? `≈${formattedAmount}` : formattedAmount;
};

/**
 * Formats a numerical USD amount to four decimal places
 * rather than the standard two, based on the exchange rate
 * for NEWM to USD.
 * @param amount - The amount to format
 * @param options - Format options
 * @param options.precision - Number of decimal places, if not explicitly set, amount of 0 will be "$0" (default: 4)
 * @param options.includeCurrencySymbol - Include currency symbol "$" (default: true)
 * @param options.includeEstimateSymbol - Include estimate symbol "≈" (default: false)
 * @param options.returnZeroValueForNullish - Return "$0" instead of "N/A" (default: true)
 */
export const formatUsdAmount = (
  amount?: number,
  options?: FormatCurrencyOptions
) => {
  const {
    includeCurrencySymbol = true,
    includeEstimateSymbol = false,
    precision = 4,
    returnZeroValueForNullish = true,
  } = options ?? {};

  const isPrecisionExplicit = options?.precision !== undefined;

  if (!amount && amount !== 0) {
    if (returnZeroValueForNullish) {
      return "$0";
    } else {
      return "N/A";
    }
  }

  if (!isPrecisionExplicit && amount === 0) {
    return includeCurrencySymbol ? "$0" : "0";
  }

  if (precision === 4 && amount < 0.0001 && amount > 0) {
    return "< $0.0001";
  }

  const formattedAmount = currency(amount, {
    precision,
    symbol: includeCurrencySymbol ? "$" : "",
  }).format();

  return includeEstimateSymbol ? `≈${formattedAmount}` : formattedAmount;
};

export const Currency = {
  NEWM: {
    conversion: LOVELACE_CONVERSION,
    costAssetName: NEWM_ASSET_NAME,
    costPolicyId: NEWM_POLICY_ID,
    name: CurrencyType.NEWM,
  },
  USD: {
    conversion: USD_CONVERSION,
    costAssetName: "",
    costPolicyId: "555344",
    name: CurrencyType.USD,
  },
};

export const convertNewmiesToNewm = (newmies: number): number => {
  return newmies / LOVELACE_CONVERSION;
};

export const convertLovelaceToAda = (lovelace: number): number => {
  return lovelace / LOVELACE_CONVERSION;
};

export const convertMicroUsdToUsd = (microUsd: number): number => {
  return microUsd / LOVELACE_CONVERSION;
};

export const convertNewmiesToUsd = (
  newmies: number,
  preConvertedUsdPrice: number
): number => {
  const newm = convertNewmiesToNewm(newmies);
  const usdPrice = preConvertedUsdPrice / LOVELACE_CONVERSION;

  return newm * usdPrice;
};

export const convertAdaToUsd = (
  ada: number,
  preConvertedUsdPrice: number
): number => {
  const usd = preConvertedUsdPrice / LOVELACE_CONVERSION;

  return usd * ada;
};
