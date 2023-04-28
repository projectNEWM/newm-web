import { FunctionComponent } from "react";
import { Box, Container } from "@mui/material";
import { Button, Typography } from "elements";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { setIsConnectWalletModalOpen } from "modules/ui";
import { useDispatch } from "react-redux";
import { UnclaimedRoyalties } from "./UnclaimedRoyalties";
import TabbedContainer from "./TabbedContainer";
import Portfolio from "./Portfolio";
import Transactions from "./TransactionsList";

const Wallet: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { wallet } = useConnectWallet();

  return (
    <Container
      maxWidth={ false }
      sx={ {
        marginLeft: [null, null, 4.5],
        overflow: "auto",
        textAlign: ["center", "initial"],
      } }
    >
      <Box
        sx={ {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        } }
      >
        <Typography variant="h3" fontWeight={ 800 } mb={ 5 }>
          WALLET
        </Typography>

        { wallet ? (
          <Button
            sx={ { mr: [0, 4.75], mb: 5 } }
            width="compact"
            variant="outlined"
            onClick={ () => dispatch(setIsConnectWalletModalOpen(true)) }
          >
            Disconnect Wallet
          </Button>
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
      <UnclaimedRoyalties unclaimedRoyalties={ 5.35 } />
      <TabbedContainer
        sx={ { pt: 5 } }
        label1="PORTFOLIO"
        label2="TRANSACTIONS"
        Component1={ Portfolio }
        Component2={ Transactions }
      />
    </Container>
  );
};

export default Wallet;
