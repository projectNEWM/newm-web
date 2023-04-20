import { Box } from "@mui/material";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import theme from "theme";
import { SearchBox } from "components";
import { Song, useGetSongsQuery } from "modules/song";
import { TableSkeleton, Typography } from "elements";
import { useWindowDimensions } from "common";
import Hls from "hls.js";
import { isProd } from "buildParams";
import { setToastMessage } from "modules/ui";
import { useDispatch } from "react-redux";
import NoSongsYet from "./NoSongsYet";
import SongList from "./SongList";

const Discography: FunctionComponent = () => {
  const dispatch = useDispatch();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const {
    data: songs = [],
    isLoading,
    isSuccess,
  } = useGetSongsQuery({ ownerIds: ["me"] });
  const [filteredData, setFilteredData] = useState<Song[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [currentPlayingSongId, setCurrentPlayingSongId] = useState<string>();
  const viewportWidth = useWindowDimensions()?.width;

  /**
   * Stop currently playing song and reset video element.
   */
  const stopSong = () => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    videoRef.current.removeAttribute("src");
    videoRef.current.load();
    setCurrentPlayingSongId(undefined);
  };

  /**
   * Play song using native browser functionality.
   */
  const playSongNatively = (song: Song) => {
    if (!videoRef.current || !song.streamUrl) return;

    videoRef.current.src = song.streamUrl;
    videoRef.current.addEventListener("loadedmetadata", () => {
      videoRef.current?.play();
      setCurrentPlayingSongId(song.id);
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
    setCurrentPlayingSongId(song.id);
  };

  /**
   * Play song natively if possible, otherwise, play using the HLS package.
   */
  const handleSongPlayPause = (song: Song) => {
    try {
      if (!videoRef.current || !song.streamUrl || !Hls.isSupported()) {
        throw new Error();
      }

      const isSongPlaying = !!currentPlayingSongId;
      const isNewSong = song.id !== currentPlayingSongId;

      if (isSongPlaying) stopSong();

      if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        if (isNewSong) playSongNatively(song);
      } else {
        if (isNewSong) playSongWithHlsJs(song);
      }
    } catch (err) {
      dispatch(
        setToastMessage({
          message: "Unable to play song",
          severity: "Error",
        })
      );

      return;
    }
  };

  const handleSearch = (searched: string) => {
    setQuery(searched);
    setPage(1);
    if (searched == "") {
      setFilteredData(songs);
    } else {
      setFilteredData(
        songs.filter(({ title = "" }) =>
          title.toLowerCase().includes(searched.toLowerCase())
        )
      );
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
    // Changing the page from a playing song will pause the song
    stopSong();
  };

  /**
   * Called with useEffect when song ends to reset icon.
   */
  const handleSongEnded = useCallback(() => {
    setCurrentPlayingSongId(undefined);
  }, []);

  useEffect(() => {
    setFilteredData(songs);
  }, [songs]);

  /**
   * Create video element and attach ref.
   */
  useEffect(() => {
    const video = document.createElement("video");
    videoRef.current = video;
  }, []);

  /**
   * Update ended listener to reset playing status when playback completes.
   */
  useEffect(() => {
    if (!videoRef.current) return;

    const ref = videoRef.current;

    if (currentPlayingSongId) {
      ref.addEventListener("ended", handleSongEnded);
    } else {
      ref.removeEventListener("ended", handleSongEnded);
    }

    return () => {
      ref.removeEventListener("ended", handleSongEnded);
    };
  }, [currentPlayingSongId, handleSongEnded]);

  // Keep song in a playing state till the song has been filtered out
  useEffect(() => {
    const isSongFound = !!filteredData?.find((filteredSong) => {
      return filteredSong.id === currentPlayingSongId;
    });

    if (!isSongFound) {
      stopSong();
    }
  }, [filteredData, currentPlayingSongId]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <SearchBox
            placeholder="Search songs"
            query={ query }
            onSearch={ handleSearch }
          />
          <TableSkeleton
            cols={
              viewportWidth && viewportWidth > theme.breakpoints.values.sm
                ? 3
                : 2
            }
          />
        </>
      );
    } else if (isSuccess && songs.length === 0) {
      return (
        <Box sx={ { margin: "auto", position: "relative", bottom: "50px" } }>
          <NoSongsYet />
        </Box>
      );
    } else if (isSuccess && songs.length > 0) {
      return (
        <>
          <SearchBox
            placeholder="Search songs"
            query={ query }
            onSearch={ handleSearch }
          />
          <SongList
            songData={ songs }
            currentPlayingSongId={ currentPlayingSongId }
            onSongPlayPause={ handleSongPlayPause }
            page={ page }
            onPageChange={ handlePageChange }
          />
        </>
      );
    }
  };

  return (
    <>
      <Typography sx={ { pb: 4 } } variant="h3">
        LIBRARY
      </Typography>
      { renderContent() }
    </>
  );
};

export default Discography;
