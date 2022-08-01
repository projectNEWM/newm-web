import { FunctionComponent } from "react";
import { Box, Container } from "@mui/material";
import { FilledButton, Typography } from "elements";
import theme from "theme";
import { UnclaimedRoyalties } from "./UnclaimedRoyalties";
import TabbedContainer from "./TabbedContainer";
import Portfolio from "./Portfolio";
import Transactions from "./Transactions";

const Wallet: FunctionComponent = () => {
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
        <FilledButton
          sx={ { mr: [0,4.75], mb: 5 } }
          backgroundColor={ theme.gradients.crypto }
        >  
          Connect Wallet
        </FilledButton>
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
