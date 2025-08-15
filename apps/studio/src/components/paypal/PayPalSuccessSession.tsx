import { FunctionComponent, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { Button, GradientTypography } from "@newm-web/elements";
import theme from "@newm-web/theme";

const PayPalSuccessSession: FunctionComponent = () => {
  useEffect(() => {
    window.opener?.postMessage("paypal-payment-success");
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
      <Typography variant="h1">THANK YOU!</Typography>
      <GradientTypography
        style={ { ...theme.typography.emphasized } }
        variant="h1"
      >
        Head back to the upload process.
      </GradientTypography>
      <Typography
        sx={ {
          fontWeight: 400,
          my: [2, 3, 4],
        } }
      >
        Get ready to share your music and to claim royalties.
      </Typography>
      <Button onClick={ handleClick }>Got it</Button>
    </Stack>
  );
};

export default PayPalSuccessSession;
