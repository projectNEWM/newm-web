import { FunctionComponent, useEffect } from "react";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import {
  NEWM_ASSET_NAME,
  NEWM_POLICY_ID,
  getIsWalletEnvMismatch,
} from "@newm-web/utils";
import { WalletModal } from "@newm-web/components";
import {
  selectUi,
  setIsConnectWalletModalOpen,
  setToastMessage,
} from "../modules/ui";
import { useAppDispatch, useAppSelector } from "../common";
import { saveWalletAddress } from "../modules/session";
import {
  setWalletAdaBalance,
  setWalletAddress,
  setWalletNewmBalance,
} from "../modules/wallet";

const ConnectWalletModal: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { isConnectWalletModalOpen } = useAppSelector(selectUi);
  const { wallet, getBalance, getTokenBalance, getAddress } =
    useConnectWallet();

  const handleConnect = async () => {
    if (!wallet) return;

    const isWalletEnvMismatch = await getIsWalletEnvMismatch(wallet);
    if (isWalletEnvMismatch) return;

    dispatch(
      setToastMessage({
        message: "Wallet successfully connected",
        severity: "success",
      })
    );

    dispatch(saveWalletAddress(wallet));
  };

  const handleDisconnect = () => {
    dispatch(setWalletAdaBalance(0));
    dispatch(setWalletNewmBalance(0));
    dispatch(setWalletAddress(""));
  };

  const handleError = (message: string) => {
    dispatch(
      setToastMessage({
        message,
        severity: "error",
      })
    );
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
    <WalletModal
      isOpen={ isConnectWalletModalOpen }
      omitWallets={ ["vespr"] }
      onClose={ () => dispatch(setIsConnectWalletModalOpen(false)) }
      onConnect={ handleConnect }
      onDisconnect={ handleDisconnect }
      onError={ handleError }
    />
  );
};

export default ConnectWalletModal;
