import { projectDetails } from "buildParams";
import { selectWallet } from "modules/wallet";
import { useSelector } from "react-redux";
import { selectSale } from "./selectors";
import { BundlePrice, SaleBundle } from "./types";

export const useGetSalePrice = (): BundlePrice => {
  const { adaUsdRate } = useSelector(selectWallet);
  const { sales = [] } = useSelector(selectSale);

  const sale = sales.find(hasProjectId(projectDetails.projectId));
  const bundleAdaPrice = sale ? sale.cost / 1000000 : undefined;
  const bundleUsdPrice =
    bundleAdaPrice &&
    adaUsdRate &&
    Math.round(adaUsdRate * bundleAdaPrice * 100) / 100;

  return { ada: bundleAdaPrice, usd: bundleUsdPrice };
};

const hasProjectId = (projectId: number) => (el: SaleBundle) => {
  return el.projectId === projectId;
};
