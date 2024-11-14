import { useEffect } from "react";
import { useGetUserWalletSongsThunk } from "../song";

/**
 * Determines whether a user is the owner of a song. Checks
 * whether a user has stream tokens for the song in their wallet,
 * as well as whether they have access to the song and it's
 * currently on sale. The second criteria is a fallback for when a
 * user doesn't have any of the song's stream tokens in their wallet
 * because a sale was created for all of them.
 */
export const useHasTokens = (songId: string) => {
  const [getUserWalletSongs, { data: walletSongsResponse, isLoading }] =
    useGetUserWalletSongsThunk();

  useEffect(() => {
    getUserWalletSongs({
      ids: [songId],
      limit: 1,
    });
  }, [getUserWalletSongs, songId]);

  const hasTokens = walletSongsResponse?.data?.songs[0]?.song?.id === songId;

  return {
    hasTokens,
    isLoading,
  };
};
