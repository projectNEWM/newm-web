import { Grid } from "@mui/material";
import addSong from "assets/images/add-song.png";
import { useAppSelector } from "common";
import { History } from "history";
import { selectSongs } from "modules/song";
import { Dispatch, SetStateAction } from "react";
import AddSongCard from "./AddSongCard";
import Song from "./Song";

export interface SongGridProps {
  history: History;
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
}

const SongGrid = ({ history, setOpenPopup }: SongGridProps) => {
  const songs = useAppSelector(selectSongs);

  return (
    <>
      <Grid spacing={ 2 } container>
        { Object.keys(songs)
          .map(Number)
          .map(songId => {
            const { name, albumImage } = songs[songId];

            return (
              <Grid
                item
                xs={ 12 }
                sm={ 4 }
                md={ 3 }
                key={ songId }
                paddingBottom={ 2 }
                sx={ { margin: "0px" } }
              >
                <Song
                  history={ history }
                  songId={ songId }
                  name={ name }
                  albumImage={ albumImage }
                />
              </Grid>
            );
          }) }

        <Grid
          item
          xs={ 12 }
          sm={ 4 }
          md={ 3 }
          paddingBottom={ 2 }
          sx={ { margin: "0px" } }
        >
          <AddSongCard
            handleClick={ () => setOpenPopup(true) }
            history={ history }
            albumImage={ addSong }
            id={ "add-song" }
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SongGrid;
