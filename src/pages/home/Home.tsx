import { Box, Typography } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getInitialData } from "modules/session";

const Home: FunctionComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialData());
  }, [dispatch]);

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
