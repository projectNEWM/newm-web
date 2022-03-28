import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { useGetSongsQuery } from "modules/song";

const Home: FunctionComponent = () => {
  useGetSongsQuery("");

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
