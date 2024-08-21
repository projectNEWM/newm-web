import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { FunctionComponent, useEffect } from "react";
import { DisconnectWalletButton as DisconnectWalletButtonComponent } from "@newm-web/components";
import { DEXHUNTER_STUDIO_PARTNER_CODE } from "@newm-web/env";
import {
  LOVELACE_CONVERSION,
  NEWM_ASSET_NAME,
  NEWM_POLICY_ID,
} from "@newm-web/utils";
import { useAppDispatch, useAppSelector } from "../common";
import { setIsConnectWalletModalOpen } from "../modules/ui";
import {
  selectWallet,
  setWalletAdaBalance,
  setWalletAddress,
  setWalletNewmBalance,
} from "../modules/wallet";
import {
  useGetAdaUsdConversionRateQuery,
  useGetNewmUsdConversionRateQuery,
} from "../modules/crypto";

const DisconnectWalletButton: FunctionComponent = () => {
  const defaultUsdPrice = { usdPrice: 0 };

  const dispatch = useAppDispatch();
  const { walletAddress, walletAdaBalance, walletNewmBalance } =
    useAppSelector(selectWallet);
  const { wallet, getBalance, getTokenBalance, getAddress } =
    useConnectWallet();
  const { data: { usdPrice: adaUsdPrice } = defaultUsdPrice } =
    useGetAdaUsdConversionRateQuery();
  const { data: { usdPrice: newmUsdPrice } = defaultUsdPrice } =
    useGetNewmUsdConversionRateQuery();

  const adaUsdBalance = (adaUsdPrice * walletAdaBalance) / LOVELACE_CONVERSION;
  const newmUsdBalance =
    (newmUsdPrice * walletNewmBalance) / LOVELACE_CONVERSION;

  /**
   * Opens disconnect wallet modal
   */
  const handleDisconnectWallet = () => {
    dispatch(setIsConnectWalletModalOpen(true));
  };

  /**
   * Gets the ADA balance from the wallet and updates the Redux state.
   */
  useEffect(() => {
    if (wallet) {
      getBalance((value) => {
        dispatch(setWalletAdaBalance(value));
      });
    }
  }, [wallet, getBalance, dispatch]);

  /**
   * Gets the NEWM balance from the wallet and updates the Redux state.
   */
  useEffect(() => {
    const callback = (value: number) => {
      dispatch(setWalletNewmBalance(value));
    };

    if (wallet) {
      getTokenBalance(NEWM_POLICY_ID, callback, NEWM_ASSET_NAME);
    }
  }, [wallet, dispatch, getTokenBalance]);

  /**
   * Gets an address from the wallet and updates the Redux state.
   */
  useEffect(() => {
    if (wallet) {
      getAddress((value) => {
        dispatch(setWalletAddress(value));
      });
    }
  }, [wallet, getAddress, dispatch]);

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
