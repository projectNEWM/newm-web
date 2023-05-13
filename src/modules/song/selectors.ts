import { RootState } from "store";
import { Invite } from "./types";

export const selectSong = (state: RootState): RootState["song"] => {
  return state.song;
};

export const selectInvites = (state: RootState): Invite[] | undefined => {
  return state.song.invites;
};
