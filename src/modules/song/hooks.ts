import { isProd } from "buildParams";
import { useCallback, useEffect, useMemo, useRef } from "react";
import Hls from "hls.js";
import { Song, UseHlsJsParams, UseHlsJsResult } from "./types";

/**
 * Hook to abstract hls.js functionality.
 *
 * @param params a memoized object with onPlaysong, onStopSong, and onSongEnded
 * @returns a memoized object with onPlay and onStop
 */
export const useHlsJs = ({
  onPlaySong,
  onStopSong,
  onSongEnded,
}: UseHlsJsParams): UseHlsJsResult => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /**
   * Calls the onPlaySong handler if it exists.
   */
  const handlePlaySong = useCallback(
    (song: Song) => {
      if (onPlaySong) {
        onPlaySong(song);
      }
    },
    [onPlaySong]
  );

  /**
   * Calls onStopSong if it exists.
   */
  const handleStopSong = useCallback(
    (song?: Song) => {
      if (onStopSong) {
        onStopSong(song);
      }
    },
    [onStopSong]
  );

  /**
   * Calls onSongEnded if it exists and removes it as a listener.
   */
  const handleSongEnded: EventListener = useCallback(
    (event: Event) => {
      if (!videoRef.current) return;

      if (onSongEnded) onSongEnded(event);

      videoRef.current.removeEventListener("ended", handleSongEnded);
    },
    [onSongEnded]
  );

  /**
   * Play song using native browser functionality.
   */
  const playSongNatively = (song: Song) => {
    if (!videoRef.current || !song.streamUrl) return;

    videoRef.current.src = song.streamUrl;
    videoRef.current.addEventListener("loadedmetadata", () => {
      videoRef.current?.play();
    });
  };

  /**
   * Play song using HLS library.
   */
  const playSongWithHlsJs = (song: Song) => {
    if (!videoRef.current || !song.streamUrl) return;

    const hls = new Hls({ debug: !isProd });
    hls.loadSource(song.streamUrl);
    hls.attachMedia(videoRef.current);
    videoRef.current.play();
  };

  /**
   * Memoized playSong and stopSong handlers.
   */
  const result = useMemo(
    () => ({
      playSong: (song: Song) => {
        if (!videoRef.current) return;

        if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
          playSongNatively(song);
        } else {
          playSongWithHlsJs(song);
        }

        handlePlaySong(song);

        videoRef.current.addEventListener("ended", handleSongEnded);
      },
      stopSong: (song?: Song) => {
        if (!videoRef.current) return;

        videoRef.current.pause();
        videoRef.current.removeAttribute("src");
        videoRef.current.load();

        handleStopSong(song);

        videoRef.current.removeEventListener("ended", handleSongEnded);
      },
    }),
    [handlePlaySong, handleStopSong, handleSongEnded]
  );

  /**
   * Create video element and attach ref.
   */
  useEffect(() => {
    const video = document.createElement("video");
    videoRef.current = video;
  }, []);

  /**
   * Cleanup
   */
  useEffect(() => {
    return () => {
      result.stopSong();
      videoRef.current?.removeEventListener("ended", handleSongEnded);
    };
  }, [result, handleSongEnded]);

  return result;
};
