import { Grid, useTheme } from "@mui/material";
import { NEWMMarketplaceLogo } from "@newm-web/assets";
import { FunctionComponent } from "react";
import ConnectWallet from "./ConnectWallet";

const Header: FunctionComponent = () => {
  const theme = useTheme();

  return (
    <Grid
      px={ [3, 7.5] }
      py={ [2.5, 4] }
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
