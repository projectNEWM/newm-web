import {
  selectUi,
  setIsConnectWalletModalOpen,
  setToastMessage,
} from "modules/ui";
import { FunctionComponent } from "react";
import {
  WalletModal,
  useConnectWallet,
} from "@newm.io/cardano-dapp-wallet-connector";
import { useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common";
import { saveWalletAddress } from "modules/session";

const ConnectWalletModal: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isConnectWalletModalOpen } = useAppSelector(selectUi);
  const { wallet } = useConnectWallet();

  const handleConnect = async () => {
    if (!wallet) return;

    dispatch(
      setToastMessage({
        message: "Wallet successfully connected",
        severity: "success",
      })
    );

    dispatch(saveWalletAddress(wallet));
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
      onConnect={ handleConnect }
      onError={ handleError }
      style={ {
        backgroundColor: theme.colors.grey400,
      } }
      headerStyle={ {
        backgroundColor: theme.colors.grey500,
        borderBottomColor: theme.colors.grey500,
      } }
      disconnectButtonStyle={ {
        borderRadius: "4px",
        border: `2px solid ${theme.colors.white}`,
      } }
      isInverted={ true }
      fontFamily="Inter"
      onClose={ () => dispatch(setIsConnectWalletModalOpen(false)) }
    />
  );
};

export default ConnectWalletModal;
