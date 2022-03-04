import { RootState } from "store";

export const selectHomeViewType = (
  state: RootState
): RootState["ui"]["home"]["viewType"] => {
  return state.ui.home.viewType;
};
