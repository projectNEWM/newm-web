import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { Typography } from "elements";

const Owners: FunctionComponent = () => {
  return (
    <Box
      display="flex"
      flexGrow={ 1 }
      justifyContent="center"
      alignItems="center"
    >
      <Typography>Owners page</Typography>
    </Box>
  );
};

export default Owners;
