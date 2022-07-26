import { FunctionComponent } from "react";
import { Box, Drawer, IconButton, Stack, useTheme } from "@mui/material";
import { Typography } from "elements";
import {
  ProfileImage,
  SideBarButton,
  SideBarHeader,
  TempAuthButton,
} from "components";
import { useSelector } from "react-redux";
import { selectSession } from "modules/session";
import UploadIcon from "assets/images/UploadIcon";
import FoldersIcon from "assets/images/FoldersIcon";
import PeopleIcon from "assets/images/PeopleIcon";
import WalletIcon from "assets/images/WalletIcon";
import AnalyticsIcon from "assets/images/AnalyticsIcon";
import StarIcon from "assets/images/StarIcon";
import NewmLogoSmInverse from "assets/images/NEWM-logo-sm-inverse";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

interface SideBarProps {
  mobileVersion?: boolean;
  setMobileOpen: (field: boolean) => void;
}
export const SideBar: FunctionComponent<SideBarProps> = (
  props: SideBarProps
) => {
  const theme = useTheme();

  const { profile } = useSelector(selectSession);

  return (
    <Box
      sx={ {
        display: "flex",
        height: "100%",
        width: theme.spacing(28.75),
        minWidth: theme.spacing(28.75),
        background: theme.colors.black,
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 1.25,
      } }
    >
      { props.mobileVersion && (
        <IconButton
          onClick={ () => props.setMobileOpen(false) }
          sx={ {
            position: "absolute",
            top: "2rem",
            right: "-2.5rem",
          } }
        >
          <MenuOpenIcon sx={ { color: "white" } } />
        </IconButton>
      ) }
      <Box display="flex" flexDirection="column" alignItems="center">
        <Stack mt={ 3.5 } spacing={ 2 }>
          { !!profile.pictureUrl && (
            <ProfileImage src={ profile.pictureUrl } aria-label="profile image" />
          ) }

          <Typography variant="h4" fontWeight={ 700 } align="center">
            { profile.nickname }
          </Typography>
        </Stack>

        <Box mt={ 4 } mb={ 3 } width="100%">
          <SideBarButton
            closeMenu={ () => props.setMobileOpen(false) }
            icon={ <UploadIcon /> }
            label="UPLOAD SONG"
            to="/home/upload-song"
          />

          <Box mt={ 2 } ml={ 2.5 }>
            <SideBarHeader>YOUR CAREER</SideBarHeader>
          </Box>

          <Stack mt={ 1.75 } spacing={ 0.5 } sx={ { width: "100%" } }>
            <SideBarButton
              closeMenu={ () => props.setMobileOpen(false) }
              icon={ <FoldersIcon /> }
              label="LIBRARY"
              to="/home/library"
            />

            <SideBarButton
              closeMenu={ () => props.setMobileOpen(false) }
              icon={ <PeopleIcon /> }
              label="OWNERS"
              to="/home/owners"
            />
          </Stack>

          <Box mt={ 2 } ml={ 2.5 }>
            <SideBarHeader>YOUR PERFORMANCE</SideBarHeader>
          </Box>

          <Stack mt={ 1.75 } spacing={ 0.5 } sx={ { width: "100%" } }>
            <SideBarButton
              closeMenu={ () => props.setMobileOpen(false) }
              icon={ <WalletIcon /> }
              label="WALLET"
              to="/home/wallet"
            />

            <SideBarButton
              closeMenu={ () => props.setMobileOpen(false) }
              icon={ <AnalyticsIcon /> }
              label="ANALYTICS"
              to="/home/analytics"
            />
          </Stack>

          <Box mt={ 2 } ml={ 2.5 }>
            <SideBarHeader>GENERAL</SideBarHeader>
          </Box>

          <Box mt={ 1.75 } sx={ { width: "100%" } }>
            <SideBarButton
              closeMenu={ () => props.setMobileOpen(false) }
              icon={ <StarIcon /> }
              label="YOUR PROFILE"
              to="/home/profile"
            />
          </Box>
        </Box>
      </Box>

      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        pb={ 2.5 }
        px={ 2.5 }
        width="100%"
      >
        <NewmLogoSmInverse />
        <TempAuthButton />
      </Box>
    </Box>
  );
};

interface ResponsiveSideBarProps {
  isMobileOpen: boolean;
  drawerWidth: number;
  setMobileOpen: (field: boolean) => void;
}
const ResponsiveSideBar: FunctionComponent<ResponsiveSideBarProps> = (
  props: ResponsiveSideBarProps
) => {
  const container =
    window !== undefined ? () => window.document.body : undefined;
  return (
    <>
      <Drawer
        container={ container }
        variant="temporary"
        open={ props.isMobileOpen }
        onClose={ () => props.setMobileOpen(false) }
        ModalProps={ {
          keepMounted: true,
        } }
        sx={ {
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            overflow: props.isMobileOpen ? "visible" : "hidden",
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
        } }
      >
        <IconButton
          onClick={ () => props.setMobileOpen(false) }
          sx={ {
            position: "absolute",
            top: "2rem",
            right: "-2.5rem",
          } }
        >
          <MenuOpenIcon sx={ { color: "white" } } />
        </IconButton>
        <SideBar mobileVersion setMobileOpen={ props.setMobileOpen } />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={ {
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
        } }
        open
      >
        <SideBar setMobileOpen={ props.setMobileOpen } />
      </Drawer>
    </>
  );
};

export default ResponsiveSideBar;
