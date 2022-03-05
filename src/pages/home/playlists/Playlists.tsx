import { Box } from "@mui/material";
import { useAppSelector } from "common";
import { selectHomeViewType } from "modules/ui";
import { FunctionComponent } from "react";
import PlaylistGrid from "./PlaylistGrid";
import PlaylistList from "./PlaylistList";

const Playlists: FunctionComponent = () => {
  const viewType = useAppSelector(selectHomeViewType);

  return (
    <Box>
      { viewType === "list" ? <PlaylistList /> : <PlaylistGrid /> }
    </Box>
  );
};

export default Playlists;
