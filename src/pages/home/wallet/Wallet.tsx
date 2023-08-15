import { FunctionComponent } from "react";
import { Box, Container } from "@mui/material";
import { Button, Typography } from "elements";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { setIsConnectWalletModalOpen } from "modules/ui";
import { useAppDispatch } from "common";
import { DisconnectWalletButton } from "components";
import { UnclaimedRoyalties } from "./UnclaimedRoyalties";
import Portfolio from "./Portfolio";

const Wallet: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { wallet } = useConnectWallet();

  return (
    <Container maxWidth={ false }>
      <Box ml={ [null, null, 3] }>
        <Box
          sx={ {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 5,
          } }
        >
          <Typography variant="h3" fontWeight={ 800 }>
            WALLET
          </Typography>

          { wallet ? (
            <DisconnectWalletButton />
          ) : (
            <Button
              sx={ { mr: [0, 4.75], mb: 5 } }
              width="compact"
              gradient="crypto"
              onClick={ () => dispatch(setIsConnectWalletModalOpen(true)) }
            >
              Connect Wallet
            </Button>
          ) }
        </Box>

        <UnclaimedRoyalties unclaimedRoyalties={ 0 } />

        <Box mt={ 2.5 }>
          <Portfolio />
        </Box>
      </Box>
    </Container>
  );
};

export default Wallet;
