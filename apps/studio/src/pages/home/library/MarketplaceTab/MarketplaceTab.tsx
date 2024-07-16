import { useEffect } from "react";
import { useParams } from "react-router";
import { Box } from "@mui/material";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import theme from "@newm-web/theme";
import { ConnectWallet } from "./ConnectWallet";
import { Sale } from "./Sale";
import { MarketplaceTabSkeleton } from "../../../../components";
import { SongRouteParams } from "../types";
import { useGetUserWalletSongsThunk } from "../../../../modules/song";

export const MarketplaceTab = () => {
  const { songId } = useParams<"songId">() as SongRouteParams;
  const [getUserWalletSongs, { data: walletSongsResponse, isLoading }] =
    useGetUserWalletSongsThunk();
  const { wallet } = useConnectWallet();

  const hasStreamTokens =
    walletSongsResponse?.data?.songs[0]?.song?.id === songId;

  useEffect(() => {
    getUserWalletSongs({
      ids: [songId],
      limit: 1,
    });
  }, [getUserWalletSongs, songId, wallet]);

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
      { hasStreamTokens ? <Sale /> : <ConnectWallet /> }
    </Box>
  );
};
