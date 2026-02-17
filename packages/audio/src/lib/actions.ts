import { createAction } from "@reduxjs/toolkit";
import {
  AudioState,
  RESET_AUDIO_STATE,
  SET_AUDIO,
  SET_AUDIO_PROGRESS,
  SET_AUDIO_URL,
  SET_IS_AUDIO_PLAYING,
} from "./types";

export const resetAudioState = createAction(RESET_AUDIO_STATE);

export const setAudio = createAction<AudioState["audio"]>(SET_AUDIO);

export const setAudioProgress =
  createAction<AudioState["audioProgress"]>(SET_AUDIO_PROGRESS);

export const setAudioUrl = createAction<AudioState["audioUrl"]>(SET_AUDIO_URL);

export const setIsAudioPlaying =
  createAction<AudioState["isAudioPlaying"]>(SET_IS_AUDIO_PLAYING);
