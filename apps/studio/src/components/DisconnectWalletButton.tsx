import { FunctionComponent } from "react";
import { DisconnectWalletButton as DisconnectWalletButtonComponent } from "@newm-web/components";
import { DEXHUNTER_STUDIO_PARTNER_CODE } from "@newm-web/env";
import { LOVELACE_CONVERSION } from "@newm-web/utils";
import { useAppDispatch, useAppSelector } from "../common";
import { setIsConnectWalletModalOpen } from "../modules/ui";
import { selectWallet } from "../modules/wallet";
import {
  useGetAdaUsdConversionRateQuery,
  useGetNewmUsdConversionRateQuery,
} from "../modules/crypto";

const DisconnectWalletButton: FunctionComponent = () => {
  const defaultUsdPrice = { usdPrice: 0 };

  const dispatch = useAppDispatch();
  const { walletAddress, walletAdaBalance, walletNewmBalance } =
    useAppSelector(selectWallet);
  const { data: { usdPrice: adaUsdPrice } = defaultUsdPrice } =
    useGetAdaUsdConversionRateQuery();
  const { data: { usdPrice: newmUsdPrice } = defaultUsdPrice } =
    useGetNewmUsdConversionRateQuery();

  const adaUsdBalance = (adaUsdPrice * walletAdaBalance) / LOVELACE_CONVERSION;
  const newmUsdBalance =
    (newmUsdPrice * walletNewmBalance) / LOVELACE_CONVERSION;

  const handleDisconnectWallet = () => {
    dispatch(setIsConnectWalletModalOpen(true));
  };

  return (
    <DisconnectWalletButtonComponent
      adaBalance={ walletAdaBalance }
      adaUsdBalance={ adaUsdBalance }
      address={ walletAddress }
      newmBalance={ walletNewmBalance }
      newmUsdBalance={ newmUsdBalance }
      partnerCode={ DEXHUNTER_STUDIO_PARTNER_CODE }
      partnerName="NEWMStudio"
      onDisconnect={ handleDisconnectWallet }
    />
  );
};

export default DisconnectWalletButton;
