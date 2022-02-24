import { FunctionComponent } from "react";
import { Grid } from "@mui/material";
import { useAppSelector } from "common";
import { selectPlaylists } from "modules/playlist";
import Playlist from "./Playlist";

const Playlists: FunctionComponent = () => {
  const playlists = useAppSelector(selectPlaylists);

  return (
    <Grid pb={ 2 } spacing={ 2 } container>
      { Object.keys(playlists).map(Number).map((id) => {
        const { title, imageUrl, songCount } = playlists[id];

        return (
          <Grid key={ id } xs={ 12 } md={ 4 } lg={ 3 } item>
            <Playlist
              id={ id }
              title={ title }
              imageUrl={ imageUrl }
              songCount={ songCount }
            />
          </Grid>
        );
      }) }
    </Grid>
  );
};

export default Playlists;
