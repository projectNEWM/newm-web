import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FunctionComponent } from "react";
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
