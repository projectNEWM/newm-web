import { RootState } from "@newm.io/studio/store";

export const selectUi = (state: RootState): RootState["ui"] => state.ui;
