import { RootState } from "store";

export const selectGenres = (
  state: RootState
): RootState["genre"]["genres"] => {
  return state.genre.genres;
};
