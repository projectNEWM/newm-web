import { useParams } from "react-router";
import { Box } from "@mui/material";
import theme from "@newm-web/theme";
import { Sale } from "./Sale";
import { ConnectWallet } from "./ConnectWallet";
import { MarketplaceTabSkeleton } from "../../../../components";
import { SongRouteParams } from "../types";
import { useHasTokens } from "../../../../modules/sale";

export const MarketplaceTab = () => {
  const { songId } = useParams<"songId">() as SongRouteParams;

  const { hasTokens, isLoading } = useHasTokens(songId);

  if (isLoading) {
    return (
      <Box
        maxWidth={ [
          theme.inputField.maxWidth,
          theme.inputField.maxWidth,
          "700px",
        ] }
      >
        <MarketplaceTabSkeleton />
      </Box>
    );
  }

  return (
    <Box
      maxWidth={ [theme.inputField.maxWidth, theme.inputField.maxWidth, "700px"] }
    >
      { hasTokens ? <Sale /> : <ConnectWallet /> }
    </Box>
  );
};
