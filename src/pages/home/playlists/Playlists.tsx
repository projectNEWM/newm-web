import { Box } from "@mui/material";
import { selectHomeViewType } from "modules/ui";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import PlaylistGrid from "./PlaylistGrid";
import PlaylistList from "./PlaylistList";

const Playlists: FunctionComponent = () => {
  const viewType = useSelector(selectHomeViewType);

  return (
    <Box>
      { viewType === "list" ? <PlaylistList /> : <PlaylistGrid /> }
    </Box>
  );
};

export default Playlists;
