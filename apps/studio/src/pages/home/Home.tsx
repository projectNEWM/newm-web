import { Box, IconButton } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID } from "@newm-web/env";
import { useFlags } from "launchdarkly-react-client-sdk";
import SideBar from "./SideBar";
import UploadSong from "./uploadSong/UploadSong";

import Library from "./library/Library";
import Releases from "./releases/Releases";

import Owners from "./owners/Owners";
import Wallet from "./wallet/Wallet";
import Profile from "./profile/Profile";
import Settings from "./settings/Settings";
import { emptyProfile, useGetProfileQuery } from "../../modules/session";
import { useGetStudioClientConfigQuery } from "../../modules/content";
import { identifyReferralHeroUser } from "../../common";
import NotFoundPage from "../NotFoundPage";

const Home: FunctionComponent = () => {
  const drawerWidth = 230;
  const theme = useTheme();
  const navigate = useNavigate();

  // TODO(webStudioAlbumPhaseOne): Remove flag once flag is retired.
  const { webStudioAlbumPhaseOne, webStudioArtistReferralCampaign } =
    useFlags();

  const isReleasesPageEnabled = webStudioAlbumPhaseOne;
  const routeLocation = useLocation();

  const libraryRedirectPath = routeLocation.pathname.replace(
    "/home/library",
    "/home/releases"
  );

  const [isMobileOpen, setMobileOpen] = useState(false);

  // fetch and cache client config
  useGetStudioClientConfigQuery();

  const {
    data: {
      email,
      firstName = "",
      lastName = "",
      role,
      location,
    } = emptyProfile,
    isFetching,
    isLoading,
    error,
  } = useGetProfileQuery();

  useEffect(() => {
    if (webStudioArtistReferralCampaign && !isFetching && !error && email) {
      identifyReferralHeroUser(
        REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID,
        email,
        true // ensures id check is forced if user logins with different account
      );
    }
  }, [email, isFetching, error, webStudioArtistReferralCampaign]);

  const hasBasicDetails = !!(firstName && lastName && role && location);

  if (!hasBasicDetails && !isFetching && !error) {
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        } }
      >
        <Box left="2rem" position="absolute" top="2rem">
          <IconButton onClick={ () => setMobileOpen(true) }>
            <MenuIcon sx={ { color: "white" } } />
          </IconButton>
        </Box>
        <Routes>
          <Route
            element={
              <Navigate
                to={ webStudioAlbumPhaseOne ? "releases" : "upload-song" }
                replace
              />
            }
            path=""
          />

          <Route element={ <UploadSong /> } path="upload-song/*" />

          <Route
            element={
              webStudioAlbumPhaseOne ? (
                <Navigate
                  to={ `${libraryRedirectPath}${routeLocation.search}${routeLocation.hash}` }
                  replace
                />
              ) : (
                <Library />
              )
            }
            path="library/*"
          />

          { isReleasesPageEnabled && (
            <Route element={ <Releases /> } path="releases/*" />
          ) }

          <Route element={ <Owners /> } path="collaborators/*" />
          <Route element={ <Wallet /> } path="wallet" />
          <Route element={ <Profile /> } path="profile" />
          <Route element={ <Settings /> } path="settings" />

          <Route element={ <NotFoundPage /> } path="*" />
        </Routes>
      </Box>
    </Box>
  );
};

export default Home;
