import { Grid } from "@mui/material";
import { useAppSelector } from "common";
import { selectPlaylists } from "modules/playlist";
import { FunctionComponent } from "react";
import Playlist from "./Playlist";

const Playlists: FunctionComponent = () => {
  const playlists = useAppSelector(selectPlaylists);

  return (
    <Grid pb={ 2 } spacing={ 2 } container>
      { Object.keys(playlists).map((id) => {
        const { name, coverImageUrl, songIds } = playlists[id];

        return (
          <Grid key={ id } xs={ 12 } md={ 4 } lg={ 3 } item>
            <Playlist
              id={ id }
              name={ name }
              coverImageUrl={ coverImageUrl }
              songCount={ songIds.length }
            />
          </Grid>
        );
      }) }
    </Grid>
  );
};

export default Playlists;
