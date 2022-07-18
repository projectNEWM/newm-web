import { FunctionComponent } from "react";
import { Container } from "@mui/material";
import { Typography } from "elements";
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
        paddingY: 7.5,
        textAlign: ["center", "initial"],
      } }
    >
      <Typography variant="h3" fontWeight={ 800 } mb={ 5 }>
        WALLET
      </Typography>
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
