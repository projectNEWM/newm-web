import { useEffect } from "react";
import { useGetSaleCountQuery } from "./api";
import { useGetUserWalletSongsThunk, useHasSongAccess } from "../song";

/**
 * Determines whether a user is the owner of a song. Checks
 * whether a user has stream tokens for the song in their wallet,
 * as well as whether they have access to the song and it's
 * currently on sale. The second criteria is a fallback for when a
 * user doesn't have any of the song's stream tokens in their wallet
 * because a sale was created for all of them.
 */
export const useIsStreamTokenOwner = (songId: string) => {
  const hasAccess = useHasSongAccess(songId);
  const [
    getUserWalletSongs,
    { data: walletSongsResponse, isLoading: isWalletSongsLoading },
  ] = useGetUserWalletSongsThunk();
  const { data: countData, isLoading: isSaleCountLoading } =
    useGetSaleCountQuery({
      songIds: [songId],
    });

  useEffect(() => {
    getUserWalletSongs({
      ids: [songId],
      limit: 1,
    });
  }, [getUserWalletSongs, songId]);

  const isLoading = isWalletSongsLoading || isSaleCountLoading;
  const hasTokens = walletSongsResponse?.data?.songs[0]?.song?.id === songId;

  return {
    isLoading,
    isOwner: hasTokens || (hasAccess && !!countData?.count),
  };
};
