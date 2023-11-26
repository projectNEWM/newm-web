import { RootState } from '@newm.io/studio/store';

export const selectSession = (state: RootState): RootState['session'] => {
  return state.session;
};
