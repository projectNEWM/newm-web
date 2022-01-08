import React from "react";
import useWindowDimensions from "../hooks/useWindowDimensions.js";
import addSong from "./../images/add-song.png";
import Popup from "./Popup";
import AddSongCard from "./AddSongCard";
import SongUploadForm from "./SongUploadForm.jsx";
import { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
} from "@mui/material";
import { ArtistProfile } from "./ArtistProfile";
import songDataMock from "../data/SongData";
import Song from "./Song";

export const Songs = (props) => {
  const { history } = props;
  const [openPopup, setOpenPopup] = useState(false);

  const getSong = (songId) => {
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
      <Popup title="" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <SongUploadForm />
      </Popup>

      <Box>
        <Grid container maxHeight={height - 355} overflow={"auto"}>
          {Object.keys(songData).map((songId) => getSong(songId))}
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            paddingBottom={2}
            sx={{ margin: "0px" }}
          >
            <AddSongCard
              handleClick={() => setOpenPopup(true)}
              history={history}
              album_image={addSong}
              id={"add-song"}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
