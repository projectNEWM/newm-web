import { Howl } from "howler";
import { useCallback, useEffect, useMemo } from "react";
import {
  resetAudioState,
  setAudio,
  setAudioProgress,
  setAudioUrl,
  setIsAudioPlaying,
} from "./actions";
import { useAudioContext } from "./AudioContext";
import { AudioState } from "./types";

/**
 * Hook used to play an audio file using the Howl library.
 */
export const usePlayAudioUrl = () => {
  const { state, dispatch } = useAudioContext();
  const { audio, audioUrl, audioProgress, isAudioPlaying }: AudioState = state;

  useEffect(() => {
    return () => {
      if (audio?.playing()) {
        audio.stop();
        dispatch(resetAudioState());
      }
    };
  }, [audio, dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!audio) return;

      const prevProgress = audioProgress;
      const audioPosition = audio.seek();
      const audioDuration = audio.duration();

      const currentProgress = audioDuration
        ? (audioPosition / audioDuration) * 100
        : 0;

      if (prevProgress !== currentProgress) {
        dispatch(setAudioProgress(currentProgress));
      }
    }, 250);

    if (!audio?.playing()) {
      clearTimeout(timeoutId);
    }

    return () => clearTimeout(timeoutId);
  }, [audio, audioProgress, dispatch, isAudioPlaying]);

  const playPauseAudio = useCallback(
    (src?: string) => {
      if (!src) return;

      const isCurrentSong = src === audioUrl;

      // if currently selected song, stop or play and return
      if (isCurrentSong) {
        if (audio?.playing()) {
          audio?.stop();
          dispatch(setIsAudioPlaying(false));
          dispatch(setAudioProgress(0));
        } else {
          audio?.play();
          dispatch(setIsAudioPlaying(true));
        }

        return;
      }

      // if not currently selected song, stop playing
      if (audio?.playing()) {
        audio.stop();
        dispatch(resetAudioState());
      }

      // play new song
      const newAudio = new Howl({
        html5: true,
        onend: () => {
          dispatch(resetAudioState());
        },
        onpause: () => {
          dispatch(setIsAudioPlaying(false));
        },
        onplay: (id) => {
          dispatch(setAudioUrl(src));
          dispatch(setIsAudioPlaying(true));
        },
        src,
      });

      newAudio.play();
      dispatch(setAudio(newAudio));
    },
    [audio, audioUrl, dispatch]
  );

  const result = useMemo(
    () => ({
      // render a small percentage when just starting to show song is playing
      audioProgress: audioProgress < 0.75 ? 0.75 : audioProgress,
      audioUrl,
      isAudioPlaying,
      playPauseAudio,
    }),
    [audioUrl, isAudioPlaying, playPauseAudio, audioProgress]
  );

  return result;
};
