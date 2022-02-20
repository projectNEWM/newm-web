export enum Role {
  Producer,
  Singer,
  SoundEngineer,
}

export interface Contributor {
  name: string;
  role: Role;
  stake: number;
}

export interface Song {
  name: string;
  id: number;
  genre: string;
  user_role: Role;
  release_date: string;
  description: string;
  album_image: string;
  contributors: {
    [id: number]: Contributor;
  };
  extra_information: string;
}
