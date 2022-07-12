import { RootState } from "store";

export const selectWallet = (state: RootState): RootState["wallet"] => {
  return state.wallet;
};
