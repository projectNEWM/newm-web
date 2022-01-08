import { Box, Grid } from "@mui/material";
import { useState } from "react";
import addSong from "./../images/add-song.png";
import AddSongCard from "./AddSongCard";
import Popup from "./Popup";
import Song from "./Song";
import SongUploadForm from "./SongUploadForm.jsx";
import songDataMock from "../data/SongData";
import useWindowDimensions from "../hooks/useWindowDimensions.js";

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
