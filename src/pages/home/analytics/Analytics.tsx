import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { Typography } from "elements";

const Analytics: FunctionComponent = () => {
  return (
    <Box
      display="flex"
      flexGrow={ 1 }
      justifyContent="center"
      alignItems="center"
    >
      <Typography>Analytics page</Typography>
    </Box>
  );
};

export default Analytics;
