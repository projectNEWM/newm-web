import { FunctionComponent } from "react";
import {
  WalletModal as WalletModalComponent,
  WalletModalProps,
} from "@newm.io/cardano-dapp-wallet-connector";
import { useTheme } from "@mui/material";

/**
 * Styled wallet modal.
 */
const WalletModal: FunctionComponent<WalletModalProps> = (props) => {
  const theme = useTheme();

  return (
    <WalletModalComponent
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
      style={ {
        backgroundColor: theme.colors.grey400,
      } }
      { ...props }
    />
  );
};

export default WalletModal;
