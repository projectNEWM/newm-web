import { Grid, Box, Typography} from "@mui/material";
import { FilledButton } from "components";
import addSong from "assets/images/add-song.png";
import { useAppSelector } from "common";
import { History } from "history";
import { selectSongs } from "modules/song";
import { Dispatch, SetStateAction } from "react";
import AddSongCard from "./AddSongCard";
import Song from "./Song";

export interface SongsProps {
  history: History;
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
}

const Songs = ({ history, setOpenPopup }: SongsProps) => {

//   const songs = useAppSelector(selectSongs);
  const songs:any = [];
  if(songs[0]=== undefined){
      return(
        <div style={ { height: "100%", width: "100%" } }>
          <StyledTypography align="center" variant="h5">
            Lets Get This Party Started
          </StyledTypography>
          <hr style={ { border: 0, borderTop: "1px solid #CC33CC" } } />
          <div>
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
              <Typography variant="body1" align="center" color="primary" marginTop="30px" marginBottom="27px">
                OR
              </Typography>
              <FilledButton sx={ { width: "164px" } }>Upload Image</FilledButton>
            </Box>
        </div>
      </div>
      );
  }
  return (
    <>
        <Grid container>
          { Object.keys(songs).map(Number).map((songId) => {
            const { name, albumImage } = songs[songId];

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
    </>
  );
};

export default Songs;
