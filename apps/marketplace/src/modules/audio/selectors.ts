import { RootState } from "../../store";

export const selectAudio = (state: RootState): RootState["audio"] =>
  state.audio;
