import { TimeoutId } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import { Howl } from "howler";
import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Hook used to play an audio file using the Howl library.
 */
export const usePlayAudioUrl = () => {
  const [audio, setAudio] = useState<Howl>();
  const [audioUrl, setAudioUrl] = useState<string>();
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);

  useEffect(() => {
    return () => {
      if (audio?.playing()) {
        audio.stop();
      }
    };
  }, [audio]);

  useEffect(() => {
    if (audio) {
      setTimeout(() => {
        const prevProgress = audioProgress;
        const audioPosition = audio.seek();
        const audioDuration = audio.duration();

        const currentProgress = audioDuration
          ? (audioPosition / audioDuration) * 100
          : 0;

        if (prevProgress !== currentProgress) {
          setAudioProgress(currentProgress);
        }
      }, 250);
    }
  }, [audio, audioProgress, isAudioPlaying]);

  const playPauseAudio = useCallback(
    (src?: string) => {
      if (!src) return;

      const isCurrentSong = src === audioUrl;

      // if currently selected song, stop or play and return
      if (isCurrentSong) {
        if (audio?.playing()) {
          audio?.stop();
        } else {
          audio?.play();
        }

        return;
      }

      // if not currently selected song, stop playing
      if (audio?.playing()) {
        audio.stop();
      }

      // play new song
      const newAudio = new Howl({
        html5: true,
        onend: () => {
          setIsAudioPlaying(false);
        },
        onpause: () => {
          setIsAudioPlaying(false);
        },
        onplay: (id) => {
          setAudioUrl(src);
          setIsAudioPlaying(true);
        },
        onstop: () => {
          setIsAudioPlaying(false);
        },
        src,
      });

      newAudio.play();
      setAudio(newAudio);
    },
    [audio, audioUrl]
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
