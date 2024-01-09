export interface SongState {
  playlists: {
    [id: string]: Playlist;
  };
}

export interface Playlist {
  coverImageUrl: string;
  id: string;
  name: string;
  songIds: ReadonlyArray<string>;
}
