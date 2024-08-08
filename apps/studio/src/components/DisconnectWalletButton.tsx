import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { FunctionComponent, useEffect } from "react";
import { DisconnectWalletButton as DisconnectWalletButtonComponent } from "@newm-web/components";
import { useAppDispatch, useAppSelector } from "../common";
import { setIsConnectWalletModalOpen } from "../modules/ui";
import {
  selectWallet,
  setWalletAdaBalance,
  setWalletAddress,
  setWalletNewmBalance,
} from "../modules/wallet";

const DisconnectWalletButton: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { walletAddress, walletAdaBalance, walletNewmBalance } =
    useAppSelector(selectWallet);
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
        dispatch(setWalletAdaBalance(value));
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
      adaBalance={ walletAdaBalance }
      address={ walletAddress }
      newmBalance={ 0 }
      onDisconnect={ handleDisconnectWallet }
    />
  );
};

export default DisconnectWalletButton;
