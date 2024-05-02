import { FunctionComponent } from "react";
import { Box, useTheme } from "@mui/material";
import Songs from "./Songs";
import { mockArtist, mockSales } from "../temp/data";

const MoreSongs: FunctionComponent = () => {
  const theme = useTheme();

  const artist = mockArtist;
  const artistFullName = `${artist.firstName} ${artist.lastName}`;

  const title = (
    <Box component="span">
      MORE FROM&nbsp;
      <Box component="span" sx={ { color: theme.colors.music } }>
        { artist.stageName || artistFullName }
      </Box>
    </Box>
  );

  return (
    <Box mt={ [10, 8, 12.5] }>
      <Songs sales={ mockSales } title={ title } />
    </Box>
  );
};

export default MoreSongs;
