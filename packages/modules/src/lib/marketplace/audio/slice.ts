import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AudioState } from "./types";

const initialState: AudioState = {
  previewUrl: "",
};

const audioSlice = createSlice({
  initialState,
  name: "audio",
  reducers: {
    clearSaleAudioPreviewUrl: (state) => {
      state.previewUrl = "";
    },
    setSaleAudioPreviewUrl: (
      state,
      { payload }: PayloadAction<AudioState["previewUrl"]>
    ) => {
      state.previewUrl = payload;
    },
  },
});

export const { clearSaleAudioPreviewUrl, setSaleAudioPreviewUrl } =
  audioSlice.actions;

export default audioSlice.reducer;
