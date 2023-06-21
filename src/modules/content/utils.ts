import { GetSongGenresResponse } from "./types";

export const extractGenreNames = (genres: GetSongGenresResponse): string[] => {
  return genres.map((genre) => genre.name);
};
