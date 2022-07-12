import { FunctionComponent, useState } from "react";
import { Box, CircularProgress, Container } from "@mui/material";
import { Typography } from "elements";
import { Song, useGetSongsQuery } from "modules/song";
import { SearchBox } from "components";
import SongList from "./SongList";
import NoSongsYet from "./NoSongsYet";

const Library: FunctionComponent = () => {
  const { data = [], isLoading, isSuccess } = useGetSongsQuery();
  const songData: Song[] = data;

  const [filteredData, setFilteredData] = useState<Song[]>();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

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
          <Box
            sx={ {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            } }
          >
            <CircularProgress color="secondary" />
          </Box>
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
        marginLeft: [null, null, 4.5],
        paddingTop: "60px",
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
