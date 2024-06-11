import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AudioState } from "./types";

const initialState: AudioState = {
  audio: undefined,
  audioProgress: 0,
  audioUrl: "",
  isAudioPlaying: false,
};

const audioSlice = createSlice({
  initialState,
  name: "audio",
  reducers: {
    resetAudioState: (state) => {
      state.audio = undefined;
      state.audioProgress = 0;
      state.isAudioPlaying = false;
      state.audioUrl = "";
    },
    setAudio: (state, { payload }: PayloadAction<AudioState["audio"]>) => {
      state.audio = payload;
    },
    setAudioProgress: (
      state,
      { payload }: PayloadAction<AudioState["audioProgress"]>
    ) => {
      state.audioProgress = payload;
    },
    setAudioUrl: (
      state,
      { payload }: PayloadAction<AudioState["audioUrl"]>
    ) => {
      state.audioUrl = payload;
    },
    setIsAudioPlaying: (
      state,
      { payload }: PayloadAction<AudioState["isAudioPlaying"]>
    ) => {
      state.isAudioPlaying = payload;
    },
  },
});

export const {
  resetAudioState,
  setAudio,
  setAudioUrl,
  setAudioProgress,
  setIsAudioPlaying,
} = audioSlice.actions;

export default audioSlice.reducer;
