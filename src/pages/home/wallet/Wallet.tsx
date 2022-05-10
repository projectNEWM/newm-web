import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { Typography } from "elements";

const Wallet: FunctionComponent = () => {
  return (
    <Box
      display="flex"
      flexGrow={ 1 }
      justifyContent="center"
      alignItems="center"
    >
      <Typography>Wallet page</Typography>
    </Box>
  );
};

export default Wallet;
