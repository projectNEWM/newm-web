import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import Songs from "./Songs";
import { mockSongs } from "../temp/data";

const MoreSongs: FunctionComponent = () => {
  // TODO: fetch similar songs from artist
  const songs = mockSongs;

  return (
    <Box mb={ 8 } mt={ 16 }>
      <Songs songs={ songs } title="SIMILAR SONGS" />
    </Box>
  );
};

export default MoreSongs;
