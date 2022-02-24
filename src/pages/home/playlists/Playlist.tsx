import { Box, Typography } from "@mui/material";
import { SquareGridCard } from "components";
import { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import PlaylistMedia from "./styled/PlaylistMedia";

interface PlaylistProps {
  id: number;
  title: string;
  imageUrl: string;
  songCount: number;
}

const Playlist: FunctionComponent<PlaylistProps> = ({
  id,
  title,
  songCount,
  imageUrl,
}) => {
  const history = useHistory();

  return (
    <>
      <SquareGridCard onClick={ () => history.push(`/home/playlist/${id}`) }>
        <PlaylistMedia image={ imageUrl } />
      </SquareGridCard>

      <Box mt={ 2 }>
        <Typography variant="h5" textAlign="center">
          { title }
        </Typography>
        <Typography   variant="body1"   textAlign="center">
          { songCount } songs
        </Typography>
      </Box>
    </>
  );
};


export default Playlist;
