import { selectWallet } from "modules/wallet";
import { useSelector } from "react-redux";
import { selectSale } from "./selectors";
import { BundlePrice, SaleBundle } from "./types";

export const useGetSalePrice = (): BundlePrice => {
  const projectId = process.env.REACT_APP_PROJECT_ID;

  if (!projectId) {
    throw new Error("REACT_APP_PROJECT_ID environment variable not set");
  }

  const { adaUsdRate } = useSelector(selectWallet);
  const { sales = [] } = useSelector(selectSale);

  const sale = sales.find(hasProjectId(projectId));
  const bundleAdaPrice = sale ? sale.cost / 1000000 : undefined;
  const bundleUsdPrice =
    bundleAdaPrice &&
    adaUsdRate &&
    Math.round(adaUsdRate * bundleAdaPrice * 100) / 100;

  return { ada: bundleAdaPrice, usd: bundleUsdPrice };
};

const hasProjectId = (projectId: string) => (el: SaleBundle) => {
  return el.projectId === Number(projectId);
};
