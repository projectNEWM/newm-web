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

  const [filteredData, setFilteredData] = useState<Song[]>(songData);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [currentPlayingSong, setCurrentPlayingSong] = useState<Song | null>(
    null
  );
  const viewportWidth = useWindowDimensions()?.width;

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
      return filteredSong.id === currentPlayingSong?.id;
    });

    if (!isSongFound) {
      setCurrentPlayingSong(null);
    }
  }, [currentPlayingSong, filteredData]);

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
            currentPlayingSong={ currentPlayingSong }
            setCurrentPlayingSong={ setCurrentPlayingSong }
            page={ page }
            setPage={ setPage }
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
