import { useAppSelector } from "common";
import { RootState } from "store";
import { Song } from "./types"

export const selectSongs = (
  state: RootState
): RootState["song"]["songs"] => {
  return state.song.songs;
};
