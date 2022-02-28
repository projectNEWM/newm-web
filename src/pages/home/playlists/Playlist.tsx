import { Box, Typography } from "@mui/material";
import { SquareGridCard } from "components";
import { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import PlaylistMedia from "./styled/PlaylistMedia";

interface PlaylistProps {
  id: string;
  name: string;
  coverImageUrl: string;
  songCount: number;
}

const Playlist: FunctionComponent<PlaylistProps> = ({
  id,
  name,
  songCount,
  coverImageUrl,
}) => {
  const history = useHistory();

  return (
    <Box onClick={ () => history.push(`/home/playlist/${id}`) }>
      <SquareGridCard>
        <PlaylistMedia image={ coverImageUrl } />
      </SquareGridCard>

      <Box mt={ 2 }>
        <Typography variant="h5" textAlign="center">
          { name }
        </Typography>
        <Typography variant="body1" textAlign="center">
          { songCount } songs
        </Typography>
      </Box>
    </Box>
  );
};


export default Playlist;
