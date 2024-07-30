import { FunctionComponent } from "react";
import { Box, Container, Typography } from "@mui/material";
import { Button } from "@newm-web/elements";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { UnclaimedRoyalties } from "./UnclaimedRoyalties";
import Portfolio from "./Portfolio";
import { setIsConnectWalletModalOpen } from "../../../modules/ui";
import { useAppDispatch } from "../../../common";
import { DisconnectWalletButton } from "../../../components";

const Wallet: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { wallet } = useConnectWallet();

  return (
    <Container maxWidth={ false }>
      <Box ml={ [null, null, 3] }>
        <Box
          sx={ {
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            mb: 5,
          } }
        >
          <Typography fontWeight={ 800 } variant="h3">
            WALLET
          </Typography>

          { wallet ? (
            <DisconnectWalletButton />
          ) : (
            <Button
              gradient="crypto"
              sx={ { mb: 5, mr: [0, 4.75] } }
              width="compact"
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
