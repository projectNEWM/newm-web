import { Stack, Typography } from "@mui/material";
import { Alert, Button } from "@newm-web/elements";
import theme from "@newm-web/theme";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { useAppDispatch } from "../../../../common";
import { setIsConnectWalletModalOpen } from "../../../../modules/ui";

export const ConnectWallet = () => {
  const dispatch = useAppDispatch();
  const { wallet, disconnect } = useConnectWallet();

  const handleConnectWallet = () => {
    if (wallet) {
      disconnect();
    }

    dispatch(setIsConnectWalletModalOpen(true));
  };

  return (
    <Stack>
      <Alert>
        <Typography
          color={ theme.colors.blue }
          fontWeight={ 500 }
          variant="subtitle1"
        >
          { wallet
            ? "Your current wallet does not contain this track's stream " +
              "tokens. To create a sale on the Marketplace, please first " +
              "connect a wallet containing stream tokens for this track."
            : "Please connect a wallet containing stream tokens for " +
              "this track to create a sale on the Marketplace." }
        </Typography>
      </Alert>
      <Button
        gradient="crypto"
        sx={ { mt: 4 } }
        width="compact"
        onClick={ handleConnectWallet }
      >
        Connect Wallet
      </Button>
    </Stack>
  );
};
