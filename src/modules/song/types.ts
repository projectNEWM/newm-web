import { Role } from "modules/role";

export interface Artist {
  bio: string;
  name: string;
  roles: string;
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
  userRole: Role;
  releaseDate: string;
  description: string;
  albumImage: string;
  contributors: {
    [id: number]: Contributor;
  };
  duration: string;
  extraInformation: string;
}
