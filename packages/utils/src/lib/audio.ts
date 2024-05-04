import { Howl } from "howler";
import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Hook used to play an audio file using the Howl library.
 */
export const usePlayAudioUrl = () => {
  const [audio, setAudio] = useState<Howl>();
  const [audioUrl, setAudioUrl] = useState<string>();
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.stop();
      }
    };
  }, [audio]);

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
      audioUrl,
      isAudioPlaying,
      playPauseAudio,
    }),
    [audioUrl, isAudioPlaying, playPauseAudio]
  );

  return result;
};
