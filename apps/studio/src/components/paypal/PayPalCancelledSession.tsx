import { Stack, Typography } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { Button } from "@newm-web/elements";
import theme from "@newm-web/theme";
import { NEWMLogo } from "@newm-web/assets";

const PayPalCancelledSession: FunctionComponent = () => {
  const handleClick = () => {
    window.opener?.postMessage(
      "paypal-popup-cancelled",
      window.location.origin
    );
  };

  return (
    <Stack
      sx={ {
        alignItems: "center",
        backgroundColor: theme.colors.black,
        flexGrow: 1,
        justifyContent: "center",
      } }
    >
      <NEWMLogo />
      <Typography
        sx={ {
          mt: [2, 3, 4],
        } }
        variant="h1"
      >
        OOPS!
      </Typography>
      <Typography
        sx={ {
          fontWeight: 400,
          my: [2, 3, 4],
          px: [2, 3],
          textAlign: "center",
        } }
      >
        Sorry, we couldn&apos;t complete payment. Please attempt payment again.
      </Typography>
      <Button onClick={ handleClick }>Got it</Button>
    </Stack>
  );
};

export default PayPalCancelledSession;
