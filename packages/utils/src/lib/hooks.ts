import {
  DependencyList,
  EffectCallback,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Hls from "hls.js";
import { isProd } from "@newm-web/env";
import { Song } from "@newm-web/types";
import { UseHlsJsParams, UseHlsJsResult, WindowDimensions } from "./types";

const hasWindow = typeof window !== "undefined";

const getWindowDimensions = () => {
  const width = hasWindow ? window.innerWidth : null;
  const height = hasWindow ? window.innerHeight : null;

  return { height, width } as WindowDimensions;
};

export const useWindowDimensions = (): WindowDimensions | undefined => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useLayoutEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    if (hasWindow) {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [windowDimensions]);

  return windowDimensions;
};

export const useUserDevice = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    let isMobileOrTabletUser = false;
    (function (a) {
      if (
        // eslint-disable-next-line max-len
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        // eslint-disable-next-line max-len
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
          a.substr(0, 4)
        )
      )
        isMobileOrTabletUser = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })(navigator.userAgent || navigator.vendor || (window as any).opera);

    setIsMobileOrTablet(isMobileOrTabletUser);
  }, []);

  return { isMobileOrTablet };
};

/**
 * Used to store a value from the previous render.
 *
 * @example
 * const exampleValue = useExampleValue;
 * const prevExampleValue = usePrevious(exampleValue);
 *
 * @param value the previous value to reference
 * @returns the value from the previous render
 */
export const usePrevious = <T>(value: T) => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

/**
 * Used to run a useEffect but not run when the component first mounts. Similar
 * to the class method componentDidUpdate.
 *
 * @example
 * useEffectAfterMount(() => {
 *   // do something on next update, not including initial render
 * }, []);
 *
 * @param callback the callback to run during the next component update
 * @param dependencies the dependencies to watch for changes
 */
export const useEffectAfterMount = (
  callback: EffectCallback,
  dependencies: DependencyList | undefined
) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return callback();
    }
    isMounted.current = true;
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    isMounted.current = false;
  }, []);
};

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
  const [audioProgress, setAudioProgress] = useState(0);

  /**
   * Calls onPlaySong if it exists.
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
   * Calls onSongEnded if it exists and removes itself as a listener.
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
   * Kicks off a timeout that will update the song progress
   * if the song progressed.
   */
  const trackSongProgress = useCallback(() => {
    return setTimeout(() => {
      if (!videoRef.current) return;

      const prevProgress = audioProgress;
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      const currentProgress = duration ? (currentTime / duration) * 100 : 0;

      if (prevProgress !== currentProgress) {
        setAudioProgress(currentProgress);
      }
    }, 250);
  }, [audioProgress]);

  /**
   * Play song using native browser functionality.
   */
  const playSongNatively = useCallback((song: Song) => {
    if (!videoRef.current || !song.streamUrl) return;

    videoRef.current.src = song.streamUrl;

    videoRef.current.addEventListener("loadedmetadata", async () => {
      await videoRef.current?.play();
      trackSongProgress();
    });
    // Callback doesn't need to update on trackSongProgress changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Play song using HLS library.
   */
  const playSongWithHlsJs = useCallback((song: Song) => {
    if (!videoRef.current || !song.streamUrl) return;

    const hls = new Hls({
      debug: !isProd,
      xhrSetup: (xhr) => {
        xhr.withCredentials = true;
      },
    });

    hls.loadSource(song.streamUrl);
    hls.attachMedia(videoRef.current);

    videoRef.current.addEventListener("loadedmetadata", async () => {
      await videoRef.current?.play();
      trackSongProgress();
    });
    // Callback doesn't need to update on trackSongProgress changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Plays song using either native browser or hls.js functionality.
   */
  const playSong = useCallback(
    (song: Song) => {
      if (!videoRef.current) return;

      if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        playSongNatively(song);
      } else {
        playSongWithHlsJs(song);
      }

      handlePlaySong(song);
      videoRef.current.addEventListener("ended", handleSongEnded);
    },
    [handlePlaySong, handleSongEnded, playSongNatively, playSongWithHlsJs]
  );

  /**
   * Stops the song and resets the video element.
   */
  const stopSong = useCallback(
    (song?: Song) => {
      if (!videoRef.current) return;

      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();

      setAudioProgress(0);
      handleStopSong(song);
      videoRef.current.removeEventListener("ended", handleSongEnded);
    },
    [handleStopSong, handleSongEnded]
  );

  /**
   * Memoized playSong and stopSong handlers.
   */
  const result = useMemo(
    () => ({
      // render a small percentage when just starting to show song is playing
      audioProgress: audioProgress < 0.75 ? 0.75 : audioProgress,
      playSong,
      stopSong,
    }),
    [playSong, stopSong, audioProgress]
  );

  /**
   * Create video element and attach ref.
   */
  useEffect(() => {
    const video = document.createElement("video");
    videoRef.current = video;
  }, []);

  /**
   * Tracks song progress as it continues to play.
   */
  useEffect(() => {
    const timeoutId = trackSongProgress();

    if (!videoRef.current || videoRef.current.ended) {
      setAudioProgress(0);
      clearTimeout(timeoutId);
    }

    return () => clearTimeout(timeoutId);
  }, [audioProgress, trackSongProgress]);

  /**
   * Cleanup
   */
  useEffect(() => {
    return () => {
      stopSong();
    };
  }, [stopSong, handleSongEnded]);

  return result;
};

/**
 * MUI "useMediaQuery" alternative that works with Next.js.
 * Source: https://observablehq.com/@werehamster/avoiding-hydration-mismatch-when-using-react-hooks.
 *
 * @example
 *  const isAboveMdBreakpoint = useBetterMediaQuery(
 *    `(min-width: ${theme.breakpoints.values.md}px`
 *  );
 */
export const useBetterMediaQuery = (mediaQueryString: string) => {
  const [matches, setMatches] = useState<boolean | null>(
    window.matchMedia(mediaQueryString).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString);

    const listener = () => setMatches(!!mediaQueryList.matches);
    mediaQueryList.addEventListener("change", listener);

    listener();

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [mediaQueryString]);

  return matches;
};
