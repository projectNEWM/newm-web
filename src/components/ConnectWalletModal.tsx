import { selectUi, setIsConnectWalletModalOpen } from "modules/ui";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WalletModal } from "@newm.io/cardano-dapp-wallet-connector";
import { useTheme } from "@mui/material";

const ConnectWalletModal: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isConnectWalletModalOpen } = useSelector(selectUi);

  return (
    <WalletModal
      isOpen={ isConnectWalletModalOpen }
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
