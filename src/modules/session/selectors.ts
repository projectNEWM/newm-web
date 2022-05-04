import { RootState } from "store";

export const selectSession = (state: RootState): RootState["session"] => {
  return state.session;
};

export const selectProfile = (
  state: RootState
): RootState["session"]["profile"] => {
  return state.session.profile;
};
