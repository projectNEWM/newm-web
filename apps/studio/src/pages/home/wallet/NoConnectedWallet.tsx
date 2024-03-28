import { Stack, Typography } from "@mui/material";
import { Button } from "@newm-web/elements";
import { NEWMLogo } from "@newm-web/assets";
import { setIsConnectWalletModalOpen } from "../../../modules/ui";
import { useAppDispatch } from "../../../common";

export const NoConnectedWallet = () => {
  const dispatch = useAppDispatch();

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
        Connecting your wallet will enable you to claim your accrued royalties
        and stream token sale earnings and to view your transaction history.
      </Typography>
      <Button
        gradient="crypto"
        sx={ { mt: 2 } }
        width="compact"
        onClick={ () => dispatch(setIsConnectWalletModalOpen(true)) }
      >
        Connect Wallet
      </Button>
    </Stack>
  );
};
