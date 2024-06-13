import { Dispatch } from "react";
import { Howl } from "howler";

export const RESET_AUDIO_STATE = "resetAudioState";
export const SET_AUDIO = "setAudio";
export const SET_AUDIO_PROGRESS = "setAudioProgress";
export const SET_AUDIO_URL = "setAudioUrl";
export const SET_IS_AUDIO_PLAYING = "setIsAudioPlaying";

export interface ResetAudioStateAction {
  readonly type: typeof RESET_AUDIO_STATE;
}

export interface SetAudioAction {
  readonly payload: Howl | undefined;
  readonly type: typeof SET_AUDIO;
}

export interface SetAudioProgressAction {
  readonly payload: number;
  readonly type: typeof SET_AUDIO_PROGRESS;
}

export interface SetAudioUrlAction {
  readonly payload: string;
  readonly type: typeof SET_AUDIO_URL;
}

export interface SetIsAudioPlayingAction {
  readonly payload: boolean;
  readonly type: typeof SET_IS_AUDIO_PLAYING;
}

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
