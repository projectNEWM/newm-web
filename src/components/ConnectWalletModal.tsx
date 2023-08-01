import {
  selectUi,
  setIsConnectWalletModalOpen,
  setIsUpdateWalletAddressModalOpen,
  setToastMessage,
} from "modules/ui";
import { FunctionComponent } from "react";
import { WalletModal } from "@newm.io/cardano-dapp-wallet-connector";
import { useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common";
import {
  emptyProfile,
  selectSession,
  updateWalletAddress,
  useGetProfileQuery,
  useIsWalletEnvMismatch,
} from "modules/session";

const ConnectWalletModal: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isConnectWalletModalOpen } = useAppSelector(selectUi);
  const isEnvMismatch = useIsWalletEnvMismatch();
  const { isLoggedIn } = useAppSelector(selectSession);
  const { data: { walletAddress } = emptyProfile } = useGetProfileQuery(
    undefined,
    { skip: !isLoggedIn }
  );

  const handleConnect = () => {
    if (!isEnvMismatch) {
      if (walletAddress) {
        dispatch(setIsUpdateWalletAddressModalOpen(true));
      } else {
        dispatch(updateWalletAddress());
      }
    }

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
