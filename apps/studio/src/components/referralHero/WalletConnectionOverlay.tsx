import { Box, Typography, alpha, useTheme } from "@mui/material";
import { NEWMLogo } from "@newm-web/assets";
import { FunctionComponent } from "react";
import { Button } from "@newm-web/elements";

interface WalletConnectionOverlayProps {
  handleConnectWallet: VoidFunction;
}

const WalletConnectionOverlay: FunctionComponent<
  WalletConnectionOverlayProps
> = ({ handleConnectWallet }) => {
  const theme = useTheme();
  return (
    <Box
      sx={ {
        alignItems: "center",
        backgroundColor: alpha(`${theme.colors.grey600}`, 0.85),
        borderRadius: 2,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        left: 0,
        p: 3,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 9999,
      } }
    >
      <NEWMLogo />
      <Typography
        component="h2"
        fontWeight="700"
        mt={ 4 }
        textAlign="center"
        variant="body2"
      >
        Connect your wallet
      </Typography>
      <Typography
        maxWidth="400px"
        sx={ { mt: 1 } }
        textAlign="center"
        variant="subtitle1"
      >
        You&apos;ll need to connect your wallet before you can refer an artist
        and access your referral link.
      </Typography>
      <Button
        gradient="crypto"
        sx={ { mt: 3 } }
        width="compact"
        onClick={ handleConnectWallet }
      >
        Connect Wallet
      </Button>
    </Box>
  );
};

export default WalletConnectionOverlay;
