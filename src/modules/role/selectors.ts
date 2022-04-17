import { RootState } from "store";

export const selectRole = (state: RootState): RootState["role"] => {
  return state.role;
};
