import { Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import theme from "@newm-web/theme";

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
      <Typography variant="h1">ALMOST THERE!</Typography>
      <Typography
        sx={ {
          fontWeight: 400,
          my: [2, 3, 4],
          px: [2, 3],
        } }
      >
        Loading PayPal checkout, please wait for the song upload process to
        complete.
      </Typography>
    </Stack>
  );
};

export default PayPalLoadingSession;
