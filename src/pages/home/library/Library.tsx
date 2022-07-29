import { FunctionComponent, useState } from "react";
import { Box, Container } from "@mui/material";
import { TableSkeleton, Typography } from "elements";
import { Song, useGetSongsQuery } from "modules/song";
import { SearchBox } from "components";
import { useWindowDimensions } from "common";
import theme from "theme";
import SongList from "./SongList";
import NoSongsYet from "./NoSongsYet";

const Library: FunctionComponent = () => {
  const { data = [], isLoading, isSuccess } = useGetSongsQuery();
  const songData: Song[] = data;

  const [filteredData, setFilteredData] = useState<Song[]>();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const viewportWidth = useWindowDimensions()?.width;

  const handleSearch = (searched: string) => {
    setQuery(searched);
    setPage(1);
    if (searched == "") {
      setFilteredData(songData);
    } else {
      setFilteredData(
        songData.filter(
          (song) =>
            song.title.toLowerCase().includes(searched.toLowerCase()) ||
            song.genre.toLowerCase().includes(searched.toLowerCase())
        )
      );
    }
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
            page={ page }
            setPage={ setPage }
          />
        </>
      );
    }
  };
  return (
    <Container
      maxWidth={ false }
      sx={ {
        marginX: [null, null, 3],
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        flexWrap: "nowrap",
      } }
    >
      <Typography sx={ { pb: 4 } } variant="h3">
        LIBRARY
      </Typography>
      { renderContent(isLoading, isSuccess, songData) }
    </Container>
  );
};

export default Library;
