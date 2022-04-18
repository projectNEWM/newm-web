import { RootState } from "store";

export const selectRoles = (state: RootState): RootState["role"]["roles"] => {
  return state.role.roles;
};
