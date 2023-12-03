import { RootState } from "../../store";

export const selectPlaylists = (
  state: RootState
): RootState["playlist"]["playlists"] => {
  return state.playlist.playlists;
};
