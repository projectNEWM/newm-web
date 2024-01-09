import { FunctionComponent } from "react";
import {
  WalletModal,
  useConnectWallet,
} from "@newm.io/cardano-dapp-wallet-connector";
import { useTheme } from "@mui/material";
import {
  selectUi,
  setIsConnectWalletModalOpen,
  setToastMessage,
} from "../modules/ui";
import { useAppDispatch, useAppSelector } from "../common";
import { saveWalletAddress } from "../modules/session";

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
      disconnectButtonStyle={ {
        border: `2px solid ${theme.colors.white}`,
        borderRadius: "4px",
      } }
      fontFamily="Inter"
      headerStyle={ {
        backgroundColor: theme.colors.grey500,
        borderBottomColor: theme.colors.grey500,
      } }
      isInverted={ true }
      isOpen={ isConnectWalletModalOpen }
      style={ {
        backgroundColor: theme.colors.grey400,
      } }
      onClose={ () => dispatch(setIsConnectWalletModalOpen(false)) }
      onConnect={ handleConnect }
      onError={ handleError }
    />
  );
};

export default ConnectWalletModal;
