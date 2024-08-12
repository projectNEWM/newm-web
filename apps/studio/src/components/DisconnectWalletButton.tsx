import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { FunctionComponent, useEffect } from "react";
import { DisconnectWalletButton as DisconnectWalletButtonComponent } from "@newm-web/components";
import { DEXHUNTER_STUDIO_PARTNER_CODE } from "@newm-web/env";
import {
  NEWM_POLICY_ID,
  NEWM_TOKEN_NAME,
  useAppDispatch,
  useAppSelector,
} from "../common";
import { setIsConnectWalletModalOpen } from "../modules/ui";
import {
  selectWallet,
  setWalletAdaBalance,
  setWalletAddress,
  setWalletNewmBalance,
} from "../modules/wallet";
import { useGetADAPriceQuery, useGetNEWMPriceQuery } from "../modules/crypto";

const DisconnectWalletButton: FunctionComponent = () => {
  const defaultUsdPrice = { usdPrice: 0 };

  const dispatch = useAppDispatch();
  const { walletAddress, walletAdaBalance, walletNewmBalance } =
    useAppSelector(selectWallet);
  const { wallet, getBalance, getTokenBalance, getAddress } =
    useConnectWallet();
  const { data: { usdPrice: adaUsdPrice } = defaultUsdPrice } =
    useGetADAPriceQuery();
  const { data: { usdPrice: newmUsdPrice } = defaultUsdPrice } =
    useGetNEWMPriceQuery();

  const adaUsdBalance = (adaUsdPrice * walletAdaBalance) / 1000000;
  const newmUsdBalance = (newmUsdPrice * walletNewmBalance) / 1000000;

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
      getTokenBalance(NEWM_POLICY_ID, callback, NEWM_TOKEN_NAME);
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
