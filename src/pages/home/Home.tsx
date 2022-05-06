import { Box } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getInitialData } from "modules/session";
import { useTheme } from "@mui/material/styles";
import SideBar from "./SideBar";
import UploadSong from "./uploadSong/UploadSong";

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

      <Routes>
        <Route path="" element={ <Navigate to="upload-song" replace /> } />

        <Route path="upload-song" element={ <UploadSong /> } />
      </Routes>
    </Box>
  );
};

export default Home;
