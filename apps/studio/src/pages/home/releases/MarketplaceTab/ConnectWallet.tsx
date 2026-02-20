import { useFlags } from "launchdarkly-react-client-sdk";

import { Stack, Typography } from "@mui/material";

import {
  EnabledWallet,
  useConnectWallet,
} from "@newm.io/cardano-dapp-wallet-connector";
import { Alert, Button } from "@newm-web/elements";

import { useAppDispatch } from "../../../../common";
import { setIsConnectWalletModalOpen } from "../../../../modules/ui";

// TODO: Remove once 'webStudioDisableDistributionAndSales' retires.
const SundownAlertCopy = ({
  wallet,
}: {
  wallet: EnabledWallet | undefined;
}) => {
  return (
    <Typography fontWeight={ 500 } variant="subtitle1">
      { wallet
        ? `Your current wallet does not contain this track's stream tokens.
            Please connect a wallet containing stream tokens for this track`
        : "Please connect a wallet containing stream tokens for this track." }
    </Typography>
  );
};

export const ConnectWallet = () => {
  const { webStudioDisableDistributionAndSales } = useFlags();

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
        { webStudioDisableDistributionAndSales ? (
          <SundownAlertCopy wallet={ wallet ?? undefined } />
        ) : (
          <Typography fontWeight={ 500 } variant="subtitle1">
            { wallet
              ? "Your current wallet does not contain this track's stream " +
                "tokens. To manage sales on the Marketplace, please first " +
                "connect a wallet containing stream tokens for this track."
              : "Please connect a wallet containing stream tokens for " +
                "this track to manage sales on the Marketplace." }
          </Typography>
        ) }
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
