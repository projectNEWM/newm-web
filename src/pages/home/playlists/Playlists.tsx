import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import PlaylistGrid from "./PlaylistGrid";
import PlaylistList from "./PlaylistList";

const Playlists: FunctionComponent = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      { isSmallScreen ? <PlaylistList /> : <PlaylistGrid /> }
    </Box>
  );
};

export default Playlists;
