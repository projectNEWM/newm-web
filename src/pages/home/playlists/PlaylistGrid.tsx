import { Grid } from "@mui/material";
import { useAppSelector } from "common";
import { selectPlaylists } from "modules/playlist";
import { FunctionComponent } from "react";
import Playlist from "./Playlist";

const PlaylistGrid: FunctionComponent = () => {
  const playlists = useAppSelector(selectPlaylists);

  return (
    <Grid pb={ 2 } spacing={ 2 } container>
      { Object.values(playlists).map((playlist) => {
        const { id, name, coverImageUrl, songIds } = playlist;

        return (
          <Grid key={ id } xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } item>
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

export default PlaylistGrid;
