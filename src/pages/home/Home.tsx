import { Box, IconButton } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getInitialData } from "modules/session";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "./SideBar";
import UploadSong from "./uploadSong/UploadSong";
import Library from "./library/Library";
import Owners from "./owners/Owners";
import Wallet from "./wallet/Wallet";
import Analytics from "./analytics/Analytics";
import Profile from "./profile/Profile";

const Home: FunctionComponent = () => {
  const drawerWidth = 240;

  const theme = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialData());
  }, [dispatch]);

  const [isMobileOpen, setMobileOpen] = useState(false);
  return (
    <Box
      sx={ {
        backgroundColor: theme.colors.black100,
        display: "flex",
        flexGrow: 1,
      } }
    >
      <SideBar
        isMobileOpen={ isMobileOpen }
        setMobileOpen={ setMobileOpen }
        drawerWidth={ drawerWidth }
      />
      <Box
        component="main"
        sx={ {
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginLeft: { md: 30 },
        } }
      >
        <Box position="absolute" left="2rem" top="2rem">
          <IconButton onClick={ () => setMobileOpen(true) }>
            <MenuIcon sx={ { color: "white" } } />
          </IconButton>
        </Box>
        <Routes>
          <Route path="" element={ <Navigate to="upload-song" replace /> } />

          <Route path="upload-song" element={ <UploadSong /> } />
          <Route path="library" element={ <Library /> } />
          <Route path="owners" element={ <Owners /> } />
          <Route path="wallet" element={ <Wallet /> } />
          <Route path="analytics" element={ <Analytics /> } />
          <Route path="profile" element={ <Profile /> } />
        </Routes>
      </Box>
    </Box>
  );
};

export default Home;
