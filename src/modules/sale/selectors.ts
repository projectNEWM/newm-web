import { RootState } from "store";

export const selectSale = (state: RootState): RootState["sale"] => {
  return state.sale;
};
