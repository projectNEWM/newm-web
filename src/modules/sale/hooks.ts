import { selectWallet } from "modules/wallet";
import { useSelector } from "react-redux";
import { selectSale } from "./selectors";

interface MursPrice {
  readonly ada?: number;
  readonly usd?: number;
}

export const useGetMursPrice = (): MursPrice => {
  const { adaUsdRate } = useSelector(selectWallet);
  const { sales } = useSelector(selectSale);

  const mursSale = sales.length ? sales[0] : undefined;
  const bundleAdaPrice = mursSale ? mursSale.cost / 1000000 : undefined;
  const bundleUsdPrice =
    bundleAdaPrice &&
    adaUsdRate &&
    Math.round(adaUsdRate * bundleAdaPrice * 100) / 100;

  return { ada: bundleAdaPrice, usd: bundleUsdPrice };
};
