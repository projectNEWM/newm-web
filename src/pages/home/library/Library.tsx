import { FunctionComponent, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { TextInput, Typography } from "elements";
import { selectSongs } from "modules/song";
import { useSelector } from "react-redux";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import theme from "theme";
import { Song } from "modules/song";
import SongList from "./SongList";
import NoSongsYet from "./NoSongsYet";

const Library: FunctionComponent = () => {
  // const songs = useSelector(selectSongs);

  const songData: Song[] = useSelector(selectSongs);

  const [filteredData, setFilteredData] = useState(songData);
  const [query, setQuery] = useState("");

  const requestSearch = (searched: string) => {
    setQuery(searched);
    if (searched == "") {
      setFilteredData(songData);
    } else {
      setFilteredData(
        songData.filter((owner) =>
          owner.title.toLowerCase().includes(searched.toLowerCase())
        )
      );
    }
  };
  return (
    <Box
      padding="60px"
      display="flex"
      flexDirection="column"
      flexGrow={ 1 }
      flexWrap="nowrap"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Typography sx={ { pb: 4 } } variant="h3">
        LIBRARY
      </Typography>
      { console.log("song data is " + filteredData.length) }{ " " }
      { songData.length ? (
        <>
          <Box sx={ { pb: 3, width: "340px" } }>
            <TextInput
              value={ query }
              onChange={ (e) => requestSearch(e.target.value) }
              style={ {
                width: "100%",
              } }
              startAdornment={
                <SearchRoundedIcon
                  fontSize="large"
                  sx={ {
                    color: theme.palette.text.secondary,
                    paddingLeft: "8px",
                  } }
                />
              }
              placeholder="Search songs"
            ></TextInput>
          </Box>
          <SongList songData={ filteredData } />
        </>
      ) : (
        <Box sx={ { margin: "auto", position: "relative", bottom: "50px" } }>
          <NoSongsYet />
        </Box>
      ) }
    </Box>
  );
};

export default Library;
