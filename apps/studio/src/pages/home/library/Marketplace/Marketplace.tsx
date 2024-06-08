import { Box, Typography } from "@mui/material";
import theme from "@newm-web/theme";
import { ConnectWallet } from "./ConnectWallet";

export const Marketplace = () => {
  // TODO: Wait for BE to enable wallet filtering by ids, implement useGetUserWalletSongsThunk after
  const hasStreamTokens = false;

  return (
    <Box
      maxWidth={ [theme.inputField.maxWidth, theme.inputField.maxWidth, "700px"] }
    >
      { hasStreamTokens ? (
        <Typography>HAS STREAM TOKENS CONTENT</Typography>
      ) : (
        <ConnectWallet />
      ) }
    </Box>
  );
};
