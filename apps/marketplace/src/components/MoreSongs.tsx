import { FunctionComponent } from "react";
import { Box, useTheme } from "@mui/material";
import Songs from "./Songs";
import { mockArtist, mockSongs } from "../temp/data";

interface MoreSongsProps {
  // TODO: replace with actual artist type definition
  readonly artist?: typeof mockArtist;
}

const MoreSongs: FunctionComponent<MoreSongsProps> = ({
  // TODO: remove default
  artist: { stageName, firstName, lastName } = mockArtist,
}) => {
  const theme = useTheme();

  // TODO: fetch more songs from artist
  const songs = mockSongs;
  const artistName = stageName || `${firstName} ${lastName}`;

  const title = (
    <Box component="span">
      MORE FROM&nbsp;
      <Box component="span" sx={ { color: theme.colors.music } }>
        { artistName }
      </Box>
    </Box>
  );

  return (
    <Box mt={ [10, 8, 12.5] }>
      <Songs songs={ songs } title={ title } />
    </Box>
  );
};

export default MoreSongs;
