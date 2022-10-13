import { projectDetails } from "buildParams";
import { adaToUsd } from "modules/wallet";
import { SaleBundle, SaleBundleAmounts } from "./types";

export const parseBundleAmounts = (
  bundle?: SaleBundle,
  adaUsdRate?: number
): SaleBundleAmounts => {
  const { bundleAmount, bundlePrice, totalTokens } = projectDetails;
  const size = bundle?.amount || bundleAmount;
  const adaPrice = bundle?.cost ? bundle.cost / 1000000 : bundlePrice;
  const royaltyPercentage = bundle && (bundle.amount / totalTokens) * 100;
  const usdPrice =
    adaPrice && adaUsdRate ? adaToUsd(adaPrice, adaUsdRate) : undefined;

  return { size, usdPrice, adaPrice, royaltyPercentage };
};
