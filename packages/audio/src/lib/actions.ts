import {
  AudioState,
  ResetAudioStateAction,
  SetAudioAction,
  SetAudioProgressAction,
  SetAudioUrlAction,
  SetIsAudioPlayingAction,
} from "./types";

export const resetAudioState = (): ResetAudioStateAction => {
  return {
    type: "resetAudioState",
  };
};
export const setAudio = (payload: AudioState["audio"]): SetAudioAction => {
  return {
    payload,
    type: "setAudio",
  };
};
export const setAudioProgress = (
  payload: AudioState["audioProgress"]
): SetAudioProgressAction => {
  return {
    payload,
    type: "setAudioProgress",
  };
};
export const setAudioUrl = (
  payload: AudioState["audioUrl"]
): SetAudioUrlAction => {
  return {
    payload,
    type: "setAudioUrl",
  };
};
export const setIsAudioPlaying = (
  payload: AudioState["isAudioPlaying"]
): SetIsAudioPlayingAction => {
  return {
    payload,
    type: "setIsAudioPlaying",
  };
};
