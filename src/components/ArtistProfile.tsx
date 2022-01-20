import { Avatar, Box, Grid, Typography } from "@mui/material";
import ArtistImage from "./../images/artist-image.svg";
import Genre from "./../images/genre.svg";
import { Artist } from "../models/artist";

interface ArtistProfileProps {
  artist: Artist;
}

export const ArtistProfile = ({ artist }: ArtistProfileProps) => {
  return (
    <div>
      <Grid container>
        <Grid item xs={ 6 } sx={ { justifyContent: "flex-end" } }>
          <Avatar alt={ artist.name } src={ ArtistImage } sx={ { height: 180, marginLeft: "auto", width: 180 } } />
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
              width: "180px",
            } }
          >
            <Typography variant="h2">{ artist.name }</Typography>
            <Typography paddingTop={ 1 } paddingBottom={ 1 } variant="h6">
              { artist.roles }
            </Typography>
            <img alt="img" src={ Genre } height="30px" width="auto" />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
