import React from "react";
import useWindowDimensions from "./../hooks/useWindowDimensions.js";
import { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import { ArtistProfile } from "./artist-profile";
import songDataMock from "./../mockData";
import Song from "./song";

export const Songs = (props) => {
  const { history } = props;

  const getSong = (songId) => {
    console.log(songData[`${songId}`]);

    const { id, name, album_image } = songData[`${songId}`];

    return (
      <Grid
        item
        xs={12}
        sm={4}
        md={3}
        key={songId}
        paddingBottom={2}
        sx={{ margin: "0px" }}
      >
        <Song
          history={history}
          songId={songId}
          id={id}
          name={name}
          album_image={album_image}
        />
      </Grid>
    );
  };
  const songDataInitial = songDataMock;
  const [songData, setSongData] = useState(songDataInitial);
  const { height } = useWindowDimensions();
  return (
    <>
      <Box>
        <Grid container maxHeight={(height - 355)} overflow={"auto"}>
          {Object.keys(songData).map((songId) => getSong(songId))}
        </Grid>
      </Box>
    </>
  );
};
