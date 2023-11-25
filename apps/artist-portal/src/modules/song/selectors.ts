import { RootState } from "store";

export const selectSong = (state: RootState): RootState["song"] => {
  return state.song;
};
