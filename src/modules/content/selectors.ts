import { RootState } from "store";
import { ContentState } from "./types";

export const selectContent = (state: RootState): ContentState => {
  return state.content;
};
