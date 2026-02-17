import { Stack, Typography } from "@mui/material";
import { Button } from "@newm-web/elements";
import { NEWMLogo } from "@newm-web/assets";
import { FunctionComponent } from "react";

interface NoConnectedWalletProps {
  readonly onConnectWallet: VoidFunction;
}

const NoConnectedWallet: FunctionComponent<NoConnectedWalletProps> = ({
  onConnectWallet,
}) => {
  return (
    <Stack
      alignItems="center"
      height="100%"
      justifyContent="center"
      margin="0 auto"
      maxWidth="500px"
      rowGap={ 1 }
      textAlign="center"
    >
      <NEWMLogo />
      <Typography component="h1" fontWeight="700" mt={ 4 } variant="body2">
        Connect your wallet
      </Typography>
      <Typography variant="subtitle1">
        Connecting your wallet will enable you to claim your accrued royalties,
        stream token sale earnings, and view your transaction history.
      </Typography>
      <Button
        gradient="crypto"
        sx={ { mt: 2 } }
        width="compact"
        onClick={ onConnectWallet }
      >
        Connect Wallet
      </Button>
    </Stack>
  );
};

export default NoConnectedWallet;
