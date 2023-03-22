import { Box } from "@mui/material";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import theme from "theme";
import { SearchBox } from "components";
import { Song, useGetSongsQuery } from "modules/song";
import { TableSkeleton, Typography } from "elements";
import { useWindowDimensions } from "common";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import NoSongsYet from "./NoSongsYet";
import SongList from "./SongList";

const Discography: FunctionComponent = () => {
  const {
    data: songs = [],
    isLoading,
    isSuccess,
  } = useGetSongsQuery({ ownerIds: ["me"] });
  const [filteredData, setFilteredData] = useState<Song[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [currentPlayingSongId, setCurrentPlayingSongId] = useState<
    string | null
  >(null);
  const audioPlayerRef = useRef<Player>();
  const viewportWidth = useWindowDimensions()?.width;

  // initialize audio player on page load
  useEffect(() => {
    const audioElement = new Audio();
    const newAudioPlayer = videojs(audioElement);

    audioElement.onended = () => {
      if (setCurrentPlayingSongId) {
        setCurrentPlayingSongId(null);
      }
    };

    // handles stopping audio using OS or browser media controls
    audioElement.onpause = () => {
      if (setCurrentPlayingSongId) {
        audioElement.src = "";
        setCurrentPlayingSongId(null);
      }
    };

    audioPlayerRef.current = newAudioPlayer;

    return () => {
      audioPlayerRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    setFilteredData(songs);
  }, [songs]);

  const handleSearch = (searched: string) => {
    setQuery(searched);
    setPage(1);
    if (searched == "") {
      setFilteredData(songs);
    } else {
      setFilteredData(
        songs.filter(
          ({ title = "", genre = "" }) =>
            title.toLowerCase().includes(searched.toLowerCase()) ||
            genre.toLowerCase().includes(searched.toLowerCase())
        )
      );
    }
  };

  // Keep song in a playing state till the song has been filtered out
  useEffect(() => {
    const isSongFound = !!filteredData?.find((filteredSong) => {
      return filteredSong.id === currentPlayingSongId;
    });

    if (!isSongFound) {
      setCurrentPlayingSongId(null);
      audioPlayerRef.current?.pause();
      audioPlayerRef.current?.src(undefined);
    }
  }, [currentPlayingSongId, filteredData]);

  // Play and stop audio stream source when selected
  const handleSongPlayPause = (song: Song) => {
    if (song.id === currentPlayingSongId) {
      setCurrentPlayingSongId(null);
      audioPlayerRef.current?.pause();
      audioPlayerRef.current?.src(undefined);
    } else {
      if (song.streamUrl) {
        setCurrentPlayingSongId(song.id);
        audioPlayerRef.current?.options({ poster: `${song.coverArtUrl}` });
        audioPlayerRef.current?.src(song.streamUrl);
        audioPlayerRef.current?.play();
      }
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
    // Changing the page from a playing song will pause the song
    setCurrentPlayingSongId(null);
  };

  const renderContent = (
    isLoading: boolean,
    isSuccess: boolean,
    songs: Song[]
  ) => {
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
            handleSongPlayPause={ handleSongPlayPause }
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
      { renderContent(isLoading, isSuccess, songs) }
    </>
  );
};

export default Discography;
