export interface Genre {
  genre_id: number;
  name: string;
}

export type GetSongGenresResponse = Genre[];
