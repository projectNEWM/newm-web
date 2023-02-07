import { Box } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import theme from "theme";
import { SearchBox } from "components";
import { Song, useGetSongsQuery } from "modules/song";
import { TableSkeleton, Typography } from "elements";
import { useWindowDimensions } from "common";
import NoSongsYet from "./NoSongsYet";
import SongList from "./SongList";

const Discography: FunctionComponent = () => {
  const { data = [], isLoading, isSuccess } = useGetSongsQuery();
  const songData: Song[] = data;
  const [filteredData, setFilteredData] = useState<Song[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [currentPlayingSongId, setCurrentPlayingSongId] = useState<
    string | null
  >(null);
  const viewportWidth = useWindowDimensions()?.width;

  useEffect(() => {
    setFilteredData(songData);
  }, [songData]);

  const handleSearch = (searched: string) => {
    setQuery(searched);
    setPage(1);
    if (searched == "") {
      setFilteredData(songData);
    } else {
      setFilteredData(
        songData.filter(
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
    }
  }, [currentPlayingSongId, filteredData]);

  const handleSongPlayPause = (song: Song) => {
    if (song.id === currentPlayingSongId) {
      setCurrentPlayingSongId(null);
    } else {
      setCurrentPlayingSongId(song.id);
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
    songData: Song[]
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
    } else if (isSuccess && songData.length == 0) {
      return (
        <Box sx={ { margin: "auto", position: "relative", bottom: "50px" } }>
          <NoSongsYet />
        </Box>
      );
    } else if (isSuccess && songData.length > 0) {
      return (
        <>
          <SearchBox
            placeholder="Search songs"
            query={ query }
            onSearch={ handleSearch }
          />
          <SongList
            songData={ query == "" ? songData : filteredData }
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
      { renderContent(isLoading, isSuccess, songData) }
    </>
  );
};

export default Discography;
