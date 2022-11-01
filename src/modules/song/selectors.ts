import { RootState } from "store";

export const selectSongs = (state: RootState): RootState["song"]["songs"] => {
  return state.song.songs;
};

export const selectSongIsLoading = (state: RootState): boolean => {
  return state.song.isLoading;
};
