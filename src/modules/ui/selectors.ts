import { RootState } from "store";

export const selectUi = (state: RootState): RootState["ui"] => state.ui;
