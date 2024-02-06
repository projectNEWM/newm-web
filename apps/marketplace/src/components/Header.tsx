import { Grid, useTheme } from "@mui/material";
import { NEWMMarketplaceLogo } from "@newm-web/assets";
import { ConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { FunctionComponent } from "react";

const Header: FunctionComponent = () => {
  const theme = useTheme();

  return (
    <Grid
      p={ 4 }
      sx={ {
        alignItems: "center",
        borderBottom: `2px solid ${theme.colors.grey500}`,
        direction: "row",
        display: "flex",
        justifyContent: "space-between",
      } }
    >
      <NEWMMarketplaceLogo sx={ { height: "64px", width: "168px" } } />

      <ConnectWallet />
    </Grid>
  );
};

export default Header;
