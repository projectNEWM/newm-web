import { Action, AudioState } from "./types";

export const initialState: AudioState = {
  audio: undefined,
  audioProgress: 0,
  audioUrl: "",
  isAudioPlaying: false,
};

const reducer = (state: AudioState, action: Action) => {
  switch (action.type) {
    case "resetAudioState":
      return initialState;
    case "setAudio":
      return { ...state, audio: action.payload };
    case "setAudioProgress":
      return { ...state, audioProgress: action.payload };
    case "setAudioUrl":
      return { ...state, audioUrl: action.payload };
    case "setIsAudioPlaying":
      return { ...state, isAudioPlaying: action.payload };
    default:
      return state;
  }
};

export default reducer;
