import { useEffect } from "react";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { useGetUserWalletSongsThunk } from "../song";

/**
 * Checks whether a user has stream tokens for the song in their wallet.
 */
export const useHasSongTokens = (songId: string) => {
  const { isConnected } = useConnectWallet();
  const [getUserWalletSongs, { data: walletSongsResponse, isLoading }] =
    useGetUserWalletSongsThunk();

  useEffect(() => {
    getUserWalletSongs({
      ids: [songId],
      limit: 1,
    });
  }, [getUserWalletSongs, songId, isConnected]);

  const hasTokens = walletSongsResponse?.data?.songs[0]?.song?.id === songId;

  return {
    hasTokens,
    isLoading,
  };
};
