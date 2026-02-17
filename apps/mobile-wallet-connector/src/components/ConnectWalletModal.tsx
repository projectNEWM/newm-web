import { FunctionComponent } from "react";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { getIsWalletEnvMismatch } from "@newm-web/utils";
import { WalletModal } from "@newm-web/components";
import { useFlags } from "launchdarkly-react-client-sdk";
import {
  selectUi,
  setIsConnectWalletModalOpen,
  setToastMessage,
} from "../modules/ui";
import { useAppDispatch, useAppSelector } from "../common";

const ConnectWalletModal: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { webMobileWalletConnectorDisabledWallets } = useFlags();
  const { isConnectWalletModalOpen } = useAppSelector(selectUi);
  const { wallet } = useConnectWallet();

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
      omitWallets={ webMobileWalletConnectorDisabledWallets }
      onClose={ () => dispatch(setIsConnectWalletModalOpen(false)) }
      onConnect={ handleConnect }
      onError={ handleError }
    />
  );
};

export default ConnectWalletModal;
