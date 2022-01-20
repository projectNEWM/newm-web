import { Grid, Typography } from "@mui/material";
import { ArtistProfile } from "./ArtistProfile";
import { Artist } from "../models/artist";
interface HeaderProps {
  artist: Artist;
}
export const Header = ({ artist }: HeaderProps) => {
  return (
    <div>
      <Grid container spacing={ 2 }>
        <Grid item xs={ 12 }>
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
