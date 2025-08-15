import { Stack, Typography } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { Button } from "@newm-web/elements";
import theme from "@newm-web/theme";

const PayPalCancelledSession: FunctionComponent = () => {
  useEffect(() => {
    window.opener?.postMessage("paypal-payment-cancelled");
  }, []);

  const handleClick = () => {
    window.parent.postMessage("paypal-popup-close");
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
      <Typography variant="h1">OOPS!</Typography>
      <Typography
        sx={ {
          fontWeight: 400,
          my: [2, 3, 4],
          px: [2, 3],
        } }
      >
        Sorry, we couldn&apos;t complete payment. Please attempt payment again.
      </Typography>
      <Button onClick={ handleClick }>Got it</Button>
    </Stack>
  );
};

export default PayPalCancelledSession;
