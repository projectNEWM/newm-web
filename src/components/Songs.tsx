import { Box, Grid } from "@mui/material";
import { History } from "history";
import { useState } from "react";
import addSong from "./../images/add-song.png";
import { AddSongCard } from "./AddSongCard";
import { Popup } from "./Popup";
import { Song } from "./Song";
import { SongUploadForm } from "./SongUploadForm";
import songDataMock from "../data/SongData";
import useWindowDimensions from "../hooks/useWindowDimensions";

export interface SongsProps {
  history: History;
}

export const Songs = (props: SongsProps) => {
  const { history } = props;
  const [openPopup, setOpenPopup] = useState(false);

  const getSong = (songId: number) => {
    const { name, album_image } = songData[songId];

    return (
      <Grid item xs={ 12 } sm={ 4 } md={ 3 } key={ songId } paddingBottom={ 2 } sx={ { margin: "0px" } }>
        <Song history={ history } songId={ songId } name={ name } album_image={ album_image } />
      </Grid>
    );
  };

  const songDataInitial = songDataMock;
  const [songData] = useState(songDataInitial);
  const windowDimensions = useWindowDimensions();
  const height = windowDimensions && windowDimensions.height;

  return (
    <>
      <Popup title="" openPopup={ openPopup } setOpenPopup={ setOpenPopup }>
        <SongUploadForm />
      </Popup>

      <Box>
        <Grid container maxHeight={ height && height - 355 } overflow={ "auto" }>
          { Object.keys(songData).map(songId => getSong(parseInt(songId))) }
          <Grid item xs={ 12 } sm={ 4 } md={ 3 } paddingBottom={ 2 } sx={ { margin: "0px" } }>
            <AddSongCard
              handleClick={ () => setOpenPopup(true) }
              history={ history }
              albumImage={ addSong }
              id={ "add-song" }
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
