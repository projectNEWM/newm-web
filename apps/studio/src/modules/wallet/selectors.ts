import { RootState } from '@newm.io/studio/store';

export const selectWallet = (state: RootState): RootState['wallet'] => {
  return state.wallet;
};
