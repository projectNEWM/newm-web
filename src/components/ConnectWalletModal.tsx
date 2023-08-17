import {
  selectUi,
  setIsConnectWalletModalOpen,
  setIsUpdateWalletAddressModalOpen,
  setIsWalletEnvMismatchModalOpen,
  setToastMessage,
} from "modules/ui";
import { FunctionComponent } from "react";
import {
  WalletModal,
  getWalletAddress,
  useConnectWallet,
} from "@newm.io/cardano-dapp-wallet-connector";
import { useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common";
import {
  emptyProfile,
  getIsWalletEnvMismatch,
  selectSession,
  useGetProfileQuery,
} from "modules/session";

const ConnectWalletModal: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isConnectWalletModalOpen } = useAppSelector(selectUi);
  const { isLoggedIn } = useAppSelector(selectSession);
  const { wallet } = useConnectWallet();
  const { data: { walletAddress: savedWalletAddress } = emptyProfile } =
    useGetProfileQuery(undefined, { skip: !isLoggedIn });

  const handleConnect = async () => {
    if (!wallet) return;

    const isEnvMismatch = await getIsWalletEnvMismatch(wallet);
    const newWalletAddress = await getWalletAddress(wallet);

    // Notify the user if their connected wallet is for the incorrect env
    if (isEnvMismatch) {
      dispatch(setIsWalletEnvMismatchModalOpen(true));
      return;
    }

    // If the user doesn't have a saved address, or if the address from
    // the recently connected wallet is different than the currently saved
    // address, prompt them before overwriting it.
    if (!savedWalletAddress || savedWalletAddress !== newWalletAddress) {
      dispatch(setIsUpdateWalletAddressModalOpen(true));
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
