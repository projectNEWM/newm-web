import { Box, Grid, Typography } from "@mui/material";
import addSong from "assets/images/add-song.png";
import { useAppSelector } from "common";
import { FilledButton } from "components";
import { History } from "history";
import { selectSongs } from "modules/song";
import { Dispatch, SetStateAction } from "react";
import AddSongCard from "./AddSongCard";
import Song from "./Song";
import theme from "../../../theme";

export interface SongsProps {
  history: History;
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
}

const SongGrid = ({ history, setOpenPopup }: SongsProps) => {
    const songs = useAppSelector(selectSongs);
  if (Object.values(songs).length === 0) {
    return (
      <div style={ { height: "100%", width: "100%" } }>
        <Typography 
          sx= { {
            color: theme.palette.primary.main,
            fontWeight: 900,
            padding: "34px 0 40px 0",
            width: "100%",
          } } 
          align="center" 
          variant="h5"
        >
          Lets Get This Party Started
        </Typography>
        <hr style={ { border: 0, borderTop: "1px solid #CC33CC", width:"100%" } } />
        <div>
          <Box pt="47px" pb="40px">
            <Typography 
              align="center" 
              variant="body1"
            >
              Upload your first big hit to your portal and share your talent with the world!
            </Typography>
          </Box>
          { /* IMAGE UPLOAD COMPONENT NOT WORKING */ }
          <Box
            sx={ {
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            } }
          >
            { /* DRAG AND DROP */ }
            <Typography 
              variant="body1" 
              align="center" 
              color="primary" 
              marginTop="30px" 
              marginBottom="27px"
            >
              OR
            </Typography>
            <FilledButton 
              sx={ { width: "164px" } }
            >
              Upload Image
            </FilledButton>
          </Box>
        </div>
      </div>
    );
  }
  return (
    <>
      <Grid container>
        { Object.keys(songs)
          .map(Number)
          .map(songId => {
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

        <Grid item xs={ 12 } sm={ 4 } md={ 3 } paddingBottom={ 2 } sx={ { margin: "0px" } }>
          <AddSongCard 
            handleClick={ () => setOpenPopup(true) } 
            history={ history } 
            albumImage={ addSong } 
            id={ "add-song" } 
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SongGrid;
