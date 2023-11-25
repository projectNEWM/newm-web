import { RootState } from "@newm.io/studio/store";

export const selectSong = (state: RootState): RootState["song"] => {
  return state.song;
};
