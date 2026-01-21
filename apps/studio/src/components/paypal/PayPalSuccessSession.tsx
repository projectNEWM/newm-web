import { FunctionComponent, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { GradientTypography } from "@newm-web/elements";
import theme from "@newm-web/theme";
import { useFlags } from "launchdarkly-react-client-sdk";

const PayPalSuccessSession: FunctionComponent = () => {
  // TODO(webStudioAlbumPhaseOne): Remove flag once flag is retired.
  const { webStudioAlbumPhaseOne } = useFlags();

  useEffect(() => {
    window.opener?.postMessage("paypal-payment-success");
  }, []);

  return (
    <Stack
      sx={ {
        alignItems: "center",
        backgroundColor: theme.colors.black,
        flexGrow: 1,
        justifyContent: "center",
      } }
    >
      <Typography textTransform={ "uppercase" } variant="h1">
        Payment Complete!
      </Typography>
      <GradientTypography
        style={ { ...theme.typography.emphasized, textAlign: "center" } }
        variant="h1"
      >
        Heading back to your { webStudioAlbumPhaseOne ? "Releases" : "Library" }.
      </GradientTypography>
    </Stack>
  );
};

export default PayPalSuccessSession;
