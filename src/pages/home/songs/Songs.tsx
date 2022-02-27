import { Box, Grid } from "@mui/material";
import addSong from "assets/images/add-song.png";
import { useAppSelector } from "common";
import Popup from "components/Popup";
import { History } from "history";
import { selectSongs } from "modules/song";
import { useState } from "react";
import AddSongCard from "./AddSongCard";
import Song from "./Song";
import SongUploadForm from "./SongUploadForm";

export interface SongsProps {
  history: History;
}

const Songs = ({ history }: SongsProps) => {
  const [openPopup, setOpenPopup] = useState(false);

  const songs = useAppSelector(selectSongs);

  return (
    <>
      <Popup height="522px" openPopup={ openPopup } setOpenPopup={ setOpenPopup }>
        <SongUploadForm setOpenPopup={ setOpenPopup } />
      </Popup>

      <Box>
        <Grid container>
          { Object.keys(songs)
            .map(Number)
            .map((songId) => {
              const { name, albumImage } = songs[songId];

              return (
                <Grid
                  item
                  xs={ 12 }
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
                    albumImage={ albumImage }
                  />
                </Grid>
              );
            }) }

          <Grid
            item
            xs={ 12 }
            sm={ 4 }
            md={ 3 }
            paddingBottom={ 2 }
            sx={ { margin: "0px" } }
          >
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
