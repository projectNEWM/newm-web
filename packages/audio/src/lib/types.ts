import { Dispatch } from "react";
import { Howl } from "howler";
import {
  resetAudioState,
  setAudio,
  setAudioProgress,
  setAudioUrl,
  setIsAudioPlaying,
} from "./actions";

export const RESET_AUDIO_STATE = "resetAudioState";
export const SET_AUDIO = "setAudio";
export const SET_AUDIO_PROGRESS = "setAudioProgress";
export const SET_AUDIO_URL = "setAudioUrl";
export const SET_IS_AUDIO_PLAYING = "setIsAudioPlaying";

export type ResetAudioStateAction = ReturnType<typeof resetAudioState>;
export type SetAudioAction = ReturnType<typeof setAudio>;
export type SetAudioProgressAction = ReturnType<typeof setAudioProgress>;
export type SetAudioUrlAction = ReturnType<typeof setAudioUrl>;
export type SetIsAudioPlayingAction = ReturnType<typeof setIsAudioPlaying>;

export type Action =
  | ResetAudioStateAction
  | SetAudioAction
  | SetAudioProgressAction
  | SetAudioUrlAction
  | SetIsAudioPlayingAction;

export interface Context {
  readonly dispatch: Dispatch<Action>;
  readonly state: AudioState;
}

export interface AudioState {
  readonly audio: Howl | undefined;
  readonly audioProgress: number;
  readonly audioUrl: string;
  readonly isAudioPlaying: boolean;
}
