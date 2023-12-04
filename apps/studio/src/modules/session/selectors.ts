import { RootState } from "../../store";

export const selectSession = (state: RootState): RootState["session"] => {
  return state.session;
};
