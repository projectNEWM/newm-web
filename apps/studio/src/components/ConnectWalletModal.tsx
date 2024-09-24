import { FunctionComponent } from "react";
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

    getAddress((value) => {
      dispatch(setWalletAddress(value));
    });

    getBalance((value) => {
      dispatch(setWalletAdaBalance(value));
    });

    const tokenBalanceCallback = (value: number) => {
      dispatch(setWalletNewmBalance(value));
    };

    getTokenBalance(NEWM_POLICY_ID, tokenBalanceCallback, NEWM_ASSET_NAME);
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

  return (
    <WalletModal
      isOpen={ isConnectWalletModalOpen }
      onClose={ () => dispatch(setIsConnectWalletModalOpen(false)) }
      onConnect={ handleConnect }
      onDisconnect={ handleDisconnect }
      onError={ handleError }
    />
  );
};

export default ConnectWalletModal;
