import Popup from "components/Popup";
import { useState } from "react";
import { Box, Grid } from "@mui/material";
import { History } from "history";
import addSong from "assets/images/add-song.png";
import songDataMock from "data/SongData";
import AddSongCard from "./AddSongCard";
import Song from "./Song";
import SongUploadForm from "./SongUploadForm";

export interface SongsProps {
  history: History;
}

const Songs = ({ history }: SongsProps) => {
  const [openPopup, setOpenPopup] = useState(false);

  const getSong = (songId: number) => {
    const { name, album_image } = songData[songId];

    return (
      <Grid
        item xs={ 12 }
        sm={ 4 }
        md={ 3 }
        key={ songId }
        paddingBottom={ 2 }
        sx={ { margin: "0px" } }
      >
        <Song
          history={ history }
          songId={ songId }
          name={ name }
          albumImage={ album_image }
        />
      </Grid>
    );
  };

  const songDataInitial = songDataMock;
  const [songData] = useState(songDataInitial);

  return (
    <>
      <Popup height="522px" openPopup={ openPopup } setOpenPopup={ setOpenPopup }>
        <SongUploadForm setOpenPopup={ setOpenPopup } />
      </Popup>

      <Box>
        <Grid container>
          { Object.keys(songData).map(songId => getSong(parseInt(songId))) }
          <Grid
            item xs={ 12 } sm={ 4 } md={ 3 } paddingBottom={ 2 } sx={ { margin: "0px" } }>
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

export default Songs;
