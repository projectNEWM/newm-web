import { Box } from "@mui/material";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import theme from "theme";
import { SearchBox } from "components";
import {
  Song,
  useGetSongCountQuery,
  useGetSongsQuery,
  useHlsJs,
} from "modules/song";
import { TableSkeleton, Typography } from "elements";
import { useWindowDimensions } from "common";
import NoSongsYet from "./NoSongsYet";
import SongList from "./SongList";

const Discography: FunctionComponent = () => {
  const headerHeight = 245;
  const footerHeight = 40;
  const bottomPadding = 30;
  const rowHeight = 65;
  const viewportWidth = useWindowDimensions()?.width;
  const viewportHeight = useWindowDimensions()?.height;

  const [filteredData, setFilteredData] = useState<Song[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [currentPlayingSongId, setCurrentPlayingSongId] = useState<string>();

  let songsToRequest = rowsPerPage;
  const { data: { count: totalCountOfSongs = 0 } = {} } = useGetSongCountQuery({
    ownerIds: ["me"],
  });

  const totalPagesCount = Math.ceil(totalCountOfSongs / rowsPerPage);
  const remainingSongsOnLastPage = totalCountOfSongs % rowsPerPage;

  // Determines how many songs to request for the last page
  if (page === totalPagesCount) {
    songsToRequest =
      remainingSongsOnLastPage > 0 ? remainingSongsOnLastPage : rowsPerPage;
  }

  const {
    data: songs = [],
    isLoading,
    isSuccess,
  } = useGetSongsQuery({
    ownerIds: ["me"],
    offset: page - 1,
    limit: songsToRequest,
  });

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

  // sets the # of rows per page depending on viewport height
  useEffect(() => {
    if (viewportHeight) {
      const rowsWithCurrentHeight = Math.abs(
        Math.floor(
          (viewportHeight - headerHeight - footerHeight - bottomPadding) /
            rowHeight
        )
      );

      setRowsPerPage(rowsWithCurrentHeight ? rowsWithCurrentHeight : 1);
      setPage(1);
    }
  }, [viewportHeight]);

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
            currentPlayingSongId={ currentPlayingSongId }
            onPageChange={ handlePageChange }
            onSongPlayPause={ handleSongPlayPause }
            page={ page }
            rowsPerPage={ rowsPerPage }
            songData={ songs }
            totalCountOfSongs={ totalCountOfSongs }
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
