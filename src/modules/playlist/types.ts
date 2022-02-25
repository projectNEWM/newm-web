export interface Playlist {
  id: string;
  name: string;
  coverImageUrl: string;
  songIds: ReadonlyArray<string>;
}
