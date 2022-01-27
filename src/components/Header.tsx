import { Box, Grid, Typography } from "@mui/material";
import { ArtistProfile } from "./ArtistProfile";
import { NEWMLogo } from "./NEWMLogo";
import { Artist } from "../models/artist";

interface HeaderProps {
  artist: Artist;
}
export const Header = ({ artist }: HeaderProps) => {
  return (
    <div>
      <Grid container spacing={ 2 }>
        <Box component={ Grid } item xs={ 2 } display={ { sm: "block", xs: "none" } }>
          <Box p={ 2 }>
            <NEWMLogo />
          </Box>
        </Box>
        <Grid item xs={ 12 } sm={ 8 }>
          <ArtistProfile artist={ artist } />
        </Grid>
        <Grid item xs={ 12 }>
          <div
            style={ {
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              width: "829px",
            } }
          >
            <Typography variant="body1">{ artist.bio }</Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
