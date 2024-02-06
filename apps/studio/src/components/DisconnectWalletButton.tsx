import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import currency from "currency.js";
import { FunctionComponent, useEffect } from "react";
import { DisconnectWalletButton as DisconnectWalletButtonComponent } from "@newm-web/components";
import { useAppDispatch, useAppSelector } from "../common";
import { setIsConnectWalletModalOpen } from "../modules/ui";
import {
  selectWallet,
  setWalletAddress,
  setWalletBalance,
} from "../modules/wallet";

const DisconnectWalletButton: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { walletAddress, walletBalance } = useAppSelector(selectWallet);
  const { wallet, getBalance, getAddress } = useConnectWallet();

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
        const adaBalance = currency(value, { symbol: "" }).format();
        dispatch(setWalletBalance(adaBalance));
      });
    }
  }, [wallet, getBalance, dispatch]);

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
      address={ walletAddress }
      balance={ walletBalance }
      onDisconnect={ handleDisconnectWallet }
    />
  );
};

export default DisconnectWalletButton;
