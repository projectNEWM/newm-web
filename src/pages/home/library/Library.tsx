import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { Typography } from "elements";

const Library: FunctionComponent = () => {
  return (
    <Box
      display="flex"
      flexGrow={ 1 }
      justifyContent="center"
      alignItems="center"
    >
      <Typography>Library page</Typography>
    </Box>
  );
};

export default Library;
