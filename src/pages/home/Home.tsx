import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";

const Home: FunctionComponent = () => {
  return (
    <Box
      display="flex"
      flexGrow="1"
      justifyContent="center"
      alignItems="center"
    >
      <Typography>Home page</Typography>
    </Box>
  );
};

export default Home;
