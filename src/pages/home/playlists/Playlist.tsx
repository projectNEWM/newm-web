import { Box, Typography } from "@mui/material";
import { FadeTransition, SquareGridCard } from "components";
import { FunctionComponent, useState } from "react";
import { useHistory } from "react-router-dom";
import PlaylistOverlay from "./PlaylistOverlay";
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

  const [isHovering, setIsHovering] = useState(false);

  return (
    <Box
      onMouseOver={ () => setIsHovering(true) }
      onMouseLeave={ () => setIsHovering(false) }
      onClick={ () => history.push(`/home/playlist/${id}`) }
    >

      <SquareGridCard>
        <FadeTransition
          in={ isHovering }
          timeout={ 100 }
          containerPosition="absolute"
        >
          <PlaylistOverlay />
        </FadeTransition>

        <Box p={ 3 } width="100%" height="100%">
          <PlaylistMedia image={ coverImageUrl } />
        </Box>
      </SquareGridCard>

      <Box mt={ 2 }>
        <Typography
          variant="h5"
          textAlign="center"
        >
          { name }
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
        >
          { songCount } songs
        </Typography>
      </Box>
    </Box>
  );
};


export default Playlist;
