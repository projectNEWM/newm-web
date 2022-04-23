export interface SongState {
  songs: ReadonlyArray<Song>;
}

export interface Artist {
  bio: string;
  name: string;
  roles: string;
}

export interface Contributor {
  name: string;
  role: string;
  stake: number;
}

export interface Song {
  name: string;
  id: number;
  genre: string;
  userRole: string;
  releaseDate: string;
  description: string;
  albumImage: string;
  contributors: {
    [id: number]: Contributor;
  };
  duration: string;
  extraInformation: string;
}
