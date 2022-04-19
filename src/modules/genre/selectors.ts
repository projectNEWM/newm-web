import { RootState } from "store";
import { GenreState } from "./types";

export const selectGenre = (state: RootState): GenreState => {
  return state.genre;
};
