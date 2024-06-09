import { useEffect } from "react";
import { useParams } from "react-router";
import { Box, Typography } from "@mui/material";
import theme from "@newm-web/theme";
import { ConnectWallet } from "./ConnectWallet";
import { MarketplaceTabSkeleton } from "../../../../components";
import { SongRouteParams } from "../types";
import { useGetUserWalletSongsThunk } from "../../../../modules/song";

export const Marketplace = () => {
  const { songId } = useParams<"songId">() as SongRouteParams;
  const [getUserWalletSongs, { data: walletSongsResponse, isLoading }] =
    useGetUserWalletSongsThunk();

  const hasStreamTokens =
    walletSongsResponse?.data?.songs[0].song.id === songId;

  useEffect(() => {
    getUserWalletSongs({
      ids: [songId],
      limit: 1,
    });
  }, [getUserWalletSongs, songId]);

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
      { hasStreamTokens ? (
        <Typography>HAS STREAM TOKENS CONTENT</Typography>
      ) : (
        <ConnectWallet />
      ) }
    </Box>
  );
};
