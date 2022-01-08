import React from "react";
import ArtistImage from "./../images/artist-image.svg";
import Genre from "./../images/genre.svg";
import { Typography, Avatar, Grid, Box } from "@mui/material";


export const ArtistProfile = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={6} sx={{ justifyContent: "flex-end" }}>
          <Avatar
            alt="Remy Sharp"
            src={ArtistImage}
            sx={{ width: 180, height: 180, marginLeft: "auto" }}
          />
        </Grid>

        <Grid item xs={6}>
          <Box
            sx={{
              marginTop: "40px",
              paddingTop: "0px",
              marginRight: "auto",
              textAlign: "center",
              width: "180px",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Typography variant="h2">Miah Jonez</Typography>
            <Typography paddingTop={1} paddingBottom={1} variant="h6">
              Singer, Performing Artist
            </Typography>
            <img alt="img" src={Genre} height="30px" width="auto" />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
