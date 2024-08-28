import { Buffer } from "buffer";
import { isProd } from "@newm-web/env";
import currency from "currency.js";
import { Currency as CurrencyType } from "@newm-web/types";
import { LOVELACE_CONVERSION, USD_CONVERSION } from "./sales";

export const NEWM_POLICY_ID = isProd
  ? "682fe60c9918842b3323c43b5144bc3d52a23bd2fb81345560d73f63"
  : "769c4c6e9bc3ba5406b9b89fb7beb6819e638ff2e2de63f008d5bcff";
export const NEWM_ASSET_NAME = isProd ? "4e45574d" : "744e45574d";

/**
 * Formats a numerical NEWM amount with the correct decimal
 * places and symbol.
 */
export const formatNewmAmount = (amount?: number, includeSymbol = true) => {
  if (!amount) return "0 Ɲ";

  return currency(amount, {
    pattern: "# !",
    precision: 2,
    symbol: includeSymbol ? "Ɲ" : "",
  }).format();
};

/**
 * Formats a numerical ADA amount with the correct decimal
 * places and symbol.
 */
export const formatAdaAmount = (amount?: number, includeSymbol = true) => {
  if (!amount) return "₳ 0";

  return currency(amount, {
    pattern: "! #",
    precision: 2,
    symbol: includeSymbol ? "₳" : "",
  }).format();
};

/**
 * Formats a numerical USD amount to three decimal places
 * rather than the standard two, based on the exchange rate
 * for NEWM to USD.
 */
export const formatUsdAmount = (amount?: number, precision = 3) => {
  if (!amount) return "$0";

  return currency(amount, { precision }).format();
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
    costAssetName: "555344",
    costPolicyId: "555344",
    name: CurrencyType.USD,
  },
};
