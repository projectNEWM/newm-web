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
        <Box component={ Grid } item xs={ 3 } display={ { sm: "block", xs: "none" } }>
          <Box p="61.89px 0 0 64.44px">
            <NEWMLogo />
          </Box>
        </Box>
        <Grid item xs={ 12 } sm={ 6 }>
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
