import { RootState } from '@newm.io/studio/store';

export const selectPlaylists = (
  state: RootState
): RootState['playlist']['playlists'] => {
  return state.playlist.playlists;
};
