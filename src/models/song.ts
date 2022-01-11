import { Contributor } from "./contributor";
import { Role } from "./role";

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
