import {
  Action,
  AudioState,
  RESET_AUDIO_STATE,
  SET_AUDIO,
  SET_AUDIO_PROGRESS,
  SET_AUDIO_URL,
  SET_IS_AUDIO_PLAYING,
  SetAudioAction,
  SetAudioProgressAction,
  SetAudioUrlAction,
  SetIsAudioPlayingAction,
} from "./types";

export const initialState: AudioState = {
  audio: undefined,
  audioProgress: 0,
  audioUrl: "",
  isAudioPlaying: false,
};

const reducer = (state: AudioState, action: Action): AudioState => {
  switch (action.type) {
    case RESET_AUDIO_STATE: {
      return initialState;
    }
    case SET_AUDIO: {
      const setAudioAction = action as SetAudioAction;
      return { ...state, audio: setAudioAction.payload };
    }
    case SET_AUDIO_PROGRESS: {
      const setAudioProgressAction = action as SetAudioProgressAction;
      return { ...state, audioProgress: setAudioProgressAction.payload };
    }
    case SET_AUDIO_URL: {
      const setAudioUrlAction = action as SetAudioUrlAction;
      return { ...state, audioUrl: setAudioUrlAction.payload };
    }
    case SET_IS_AUDIO_PLAYING: {
      const setIsAudioPlayingAction = action as SetIsAudioPlayingAction;
      return { ...state, isAudioPlaying: setIsAudioPlayingAction.payload };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
