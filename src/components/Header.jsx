import { Grid, Typography } from "@mui/material";
import { ArtistProfile } from "./ArtistProfile";

export const Header = () => {
  return (
    <div>
      <Grid container spacing={ 2 }>
        <Grid item xs={ 12 }>
          <ArtistProfile>xs=4</ArtistProfile>
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
            <Typography variant="body1">
              Oscillating between the worlds of improvisation and composition in her practice, Sam holds a Bachelor of
              Music in Jazz studies from St. Francis Xavier University and continues to develop her interests in less
              academic environments. She composes for her solo guitar project, the ever- evolving small group project
              that ranges from duo to quintet and for commissions. In the fall of 2020 she was commissioned to write a
              piece for the Upstream.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
