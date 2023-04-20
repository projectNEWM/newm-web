import { Box } from "@mui/material";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import theme from "theme";
import { SearchBox } from "components";
import { Song, useGetSongsQuery, useHlsJs } from "modules/song";
import { TableSkeleton, Typography } from "elements";
import { useWindowDimensions } from "common";
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
  const [currentPlayingSongId, setCurrentPlayingSongId] = useState<string>();
  const viewportWidth = useWindowDimensions()?.width;

  const hlsJsParams = useMemo(
    () => ({
      onPlaySong: ({ id }: Song) => setCurrentPlayingSongId(id),
      onStopSong: () => setCurrentPlayingSongId(undefined),
      onSongEnded: () => setCurrentPlayingSongId(undefined),
    }),
    []
  );

  const { playSong, stopSong } = useHlsJs(hlsJsParams);

  /**
   * Plays and/or stops the song depending on if it's currently playing or not.
   */
  const handleSongPlayPause = (song: Song) => {
    const isSongPlaying = !!currentPlayingSongId;
    const isNewSong = song.id !== currentPlayingSongId;

    if (isSongPlaying) stopSong(song);
    if (isNewSong) playSong(song);
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
    // Changing the page while playing song will stop the song
    stopSong();
  };

  useEffect(() => {
    setFilteredData(songs);
  }, [songs]);

  // Keep song in a playing state till the song has been filtered out
  useEffect(() => {
    const isSongFound = !!filteredData?.find((filteredSong) => {
      return filteredSong.id === currentPlayingSongId;
    });

    if (!isSongFound) {
      stopSong();
    }
  }, [filteredData, currentPlayingSongId, stopSong]);

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
