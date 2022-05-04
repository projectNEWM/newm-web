import { Box } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getInitialData } from "modules/session";
import { useTheme } from "@mui/material/styles";
import SideBar from "./SideBar";

const Home: FunctionComponent = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialData());
  }, [dispatch]);

  return (
    <Box
      sx={ { display: "flex", flexGrow: 1, background: theme.colors.black100 } }
    >
      <SideBar />
    </Box>
  );
};

export default Home;
