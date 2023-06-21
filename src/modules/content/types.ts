export interface Genre {
  genre_id: number;
  name: string;
}

export type GetSongGenresResponse = Genre[];

export interface Role {
  genre_id: number;
  name: string;
}

export type GetSongRolesResponse = Role[];
