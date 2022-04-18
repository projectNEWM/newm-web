import { RootState } from "store";

export const selectSongs = (state: RootState): RootState["song"]["songs"] => {
  return state.song.songs;
};
