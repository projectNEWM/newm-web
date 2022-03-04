import { GridViewSharp, TableRows } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ViewType, selectHomeViewType, setHomeViewType } from "modules/ui";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";

const TabButtons: FunctionComponent = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const viewType = useSelector(selectHomeViewType);

  const handlePress = (nextViewType: ViewType) => {
    dispatch(setHomeViewType(nextViewType));
  };

  return (
    <Box>
      <IconButton
        disabled= { viewType === "list" }
        onClick={ () => handlePress("list") }
      >
        <TableRows sx={ { fill: theme.palette.text.secondary } } />
      </IconButton>

      <IconButton
        disabled={ viewType === "grid" }
        onClick={ () => handlePress("grid") }
      >
        <GridViewSharp sx={ { fill: theme.palette.text.secondary } } />
      </IconButton>
    </Box>
  );
};

export default TabButtons;
