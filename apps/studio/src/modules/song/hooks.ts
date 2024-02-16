import { emptySong, useGetSongQuery } from "./api";
import { emptyProfile, useGetProfileQuery } from "../../modules/session";

export const useHasSongAccess = (songId: string): boolean => {
  const { data: { id: userId } = emptyProfile, isLoading: isProfileLoading } =
    useGetProfileQuery();
  const { data: { ownerId } = emptySong, isLoading: isSongLoading } =
    useGetSongQuery(songId);

  return isProfileLoading || isSongLoading || userId === ownerId;
};
