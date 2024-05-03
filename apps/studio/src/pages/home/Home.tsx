import { Box, IconButton } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "./SideBar";
import UploadSong from "./uploadSong/UploadSong";
import Library from "./library/Library";
import Owners from "./owners/Owners";
import Wallet from "./wallet/Wallet";
import Profile from "./profile/Profile";
import Settings from "./settings/Settings";
import { emptyProfile, useGetProfileQuery } from "../../modules/session";

const Home: FunctionComponent = () => {
  const drawerWidth = 230;
  const theme = useTheme();
  const navigate = useNavigate();

  const [isMobileOpen, setMobileOpen] = useState(false);

  const {
    data: { firstName = "", lastName = "", role, location } = emptyProfile,
    isLoading,
  } = useGetProfileQuery();

  const hasBasicDetails = !!(firstName && lastName && role && location);

  if (!hasBasicDetails && !isLoading) {
    if (!firstName || !lastName || !role) {
      navigate("/create-profile");
      return null;
    }

    if (!location) {
      navigate("/create-profile/what-is-your-location");
      return null;
    }
  }

  if (isLoading) return null;

  return (
    <Box
      sx={ {
        backgroundColor: theme.colors.black,
        display: "flex",
        flexGrow: 1,
      } }
    >
      <SideBar isMobileOpen={ isMobileOpen } setMobileOpen={ setMobileOpen } />

      <Box
        component="main"
        sx={ {
          flexGrow: 1,
          marginLeft: { md: 30 },
          paddingX: 3,
          paddingY: 10.5,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        } }
      >
        <Box left="2rem" position="absolute" top="2rem">
          <IconButton onClick={ () => setMobileOpen(true) }>
            <MenuIcon sx={ { color: "white" } } />
          </IconButton>
        </Box>
        <Routes>
          <Route element={ <Navigate to="upload-song" replace /> } path="" />

          <Route element={ <UploadSong /> } path="upload-song/*" />
          <Route element={ <Library /> } path="library/*" />
          <Route element={ <Owners /> } path="collaborators/*" />
          <Route element={ <Wallet /> } path="wallet" />
          <Route element={ <Profile /> } path="profile" />
          <Route element={ <Settings /> } path="settings" />
        </Routes>
      </Box>
    </Box>
  );
};

export default Home;
