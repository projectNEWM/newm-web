import { Avatar, Box, Grid, Typography } from "@mui/material";
import ArtistImage from "./../images/artist-image.svg";
import Genre from "./../images/genre.svg";

export const ArtistProfile = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={ 6 } sx={ { justifyContent: "flex-end" } }>
          <Avatar alt="Remy Sharp" src={ ArtistImage } sx={ { height: 180, marginLeft: "auto", width: 180 } } />
        </Grid>

        <Grid item xs={ 6 }>
          <Box
            sx={ {
              alignItems: "center",
              flexDirection: "column",
              marginRight: "auto",
              marginTop: "40px",
              paddingTop: "0px",
              textAlign: "center",
              width: "180px"
            } }
          >
            <Typography variant="h2">Miah Jonez</Typography>
            <Typography paddingTop={ 1 } paddingBottom={ 1 } variant="h6">
              Singer, Performing Artist
            </Typography>
            <img alt="img" src={ Genre } height="30px" width="auto" />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
