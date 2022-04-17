export interface SongState {
  playlists: {
    [id: string]: Playlist;
  };
}

export interface Playlist {
  id: string;
  name: string;
  coverImageUrl: string;
  songIds: ReadonlyArray<string>;
}
