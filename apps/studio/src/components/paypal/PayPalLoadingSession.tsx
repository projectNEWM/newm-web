import { Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import theme from "@newm-web/theme";
import ResponsiveNEWMLogo from "../ResponsiveNEWMLogo";

const PayPalLoadingSession: FunctionComponent = () => {
  return (
    <Stack
      sx={ {
        alignItems: "center",
        backgroundColor: theme.colors.black,
        flexGrow: 1,
        justifyContent: "center",
      } }
    >
      <ResponsiveNEWMLogo />
      <Typography
        sx={ {
          mt: [2, 3, 4],
        } }
        variant="h1"
      >
        ALMOST THERE!
      </Typography>
      <Typography
        sx={ {
          fontWeight: 400,
          my: [2, 3, 4],
          px: [2, 3],
          textAlign: "center",
        } }
      >
        Loading PayPal checkout, please wait for the upload process to complete.
      </Typography>
    </Stack>
  );
};

export default PayPalLoadingSession;
