import { GridViewSharp, TableRows } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAppSelector } from "common";
import { ViewType, selectHomeViewType, setHomeViewType } from "modules/ui";
import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";

const TabButtons: FunctionComponent = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const viewType = useAppSelector(selectHomeViewType);

  /**
   * Sets home page view type to display items in a list or grid format.
   */
  const handlePress = (nextViewType: ViewType) => {
    dispatch(setHomeViewType(nextViewType));
  };

  return (
    <Box flexDirection="row">
      <IconButton
        aria-label="list-view-button"
        disabled= { viewType === "list" }
        onClick={ () => handlePress("list") }
      >
        <TableRows sx={ { fill: theme.palette.text.secondary } } />
      </IconButton>

      <IconButton
        aria-label="grid-view-button"
        disabled={ viewType === "grid" }
        onClick={ () => handlePress("grid") }
      >
        <GridViewSharp sx={ { fill: theme.palette.text.secondary } } />
      </IconButton>
    </Box>
  );
};

export default TabButtons;
