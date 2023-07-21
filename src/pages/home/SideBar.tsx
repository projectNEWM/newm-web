import { FunctionComponent } from "react";
import { Box, Drawer, IconButton, Stack, useTheme } from "@mui/material";
import { Typography } from "elements";
import { ProfileImage, SideBarHeader, SideBarNavLink } from "components";
import { emptyProfile, useGetProfileQuery } from "modules/session";
import UploadIcon from "assets/images/UploadIcon";
import FoldersIcon from "assets/images/FoldersIcon";
import PeopleIcon from "assets/images/PeopleIcon";
import WalletIcon from "assets/images/WalletIcon";
import StarIcon from "assets/images/StarIcon";
import NewmLogoSmInverse from "assets/images/NEWM-logo-sm-inverse";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import EmailIcon from "@mui/icons-material/Email";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import TelegramIcon from "@mui/icons-material/Telegram";
import SettingsIcon from "@mui/icons-material/Settings";

interface SideBarProps {
  mobileVersion?: boolean;
  setMobileOpen: (field: boolean) => void;
}

export const SideBar: FunctionComponent<SideBarProps> = (
  props: SideBarProps
) => {
  const theme = useTheme();

  const { data: { firstName, lastName, nickname, pictureUrl } = emptyProfile } =
    useGetProfileQuery();

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
        overflowY: "auto",
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
          { !!pictureUrl && (
            <ProfileImage
              src={ pictureUrl }
              aria-label="profile image"
              referrerPolicy="no-referrer"
            />
          ) }

          <Typography variant="h4" fontWeight={ 700 } align="center">
            { nickname ? nickname : firstName + " " + lastName }
          </Typography>
        </Stack>

        <Box mt={ 4 } mb={ 3 } width="100%">
          <SideBarNavLink
            onClick={ () => props.setMobileOpen(false) }
            icon={ <UploadIcon /> }
            label="UPLOAD A SONG"
            to="/home/upload-song"
          />

          <Box mt={ 3.5 } ml={ 2.5 }>
            <SideBarHeader>MY CAREER</SideBarHeader>
          </Box>

          <Stack mt={ 0.75 } spacing={ 0.5 } sx={ { width: "100%" } }>
            <SideBarNavLink
              onClick={ () => props.setMobileOpen(false) }
              icon={ <FoldersIcon /> }
              label="LIBRARY"
              to="/home/library"
            />

            <SideBarNavLink
              onClick={ () => props.setMobileOpen(false) }
              icon={ <PeopleIcon /> }
              label="COLLABORATORS"
              to="/home/collaborators"
            />
          </Stack>

          <Box mt={ 3.5 } ml={ 2.5 }>
            <SideBarHeader>MY PERFORMANCE</SideBarHeader>
          </Box>

          <Stack mt={ 0.75 } spacing={ 0.5 } sx={ { width: "100%" } }>
            <SideBarNavLink
              onClick={ () => props.setMobileOpen(false) }
              icon={ <WalletIcon /> }
              label="WALLET"
              to="/home/wallet"
            />
          </Stack>

          <Box mt={ 3.5 } ml={ 2.5 }>
            <SideBarHeader>MY SETTINGS</SideBarHeader>
          </Box>

          <Stack mt={ 0.75 } spacing={ 0.5 } sx={ { width: "100%" } }>
            <SideBarNavLink
              onClick={ () => props.setMobileOpen(false) }
              icon={ <StarIcon /> }
              label="PROFILE"
              to="/home/profile"
            />

            <SideBarNavLink
              onClick={ () => props.setMobileOpen(false) }
              icon={ <SettingsIcon sx={ { fontSize: "18px" } } /> }
              label="SETTINGS"
              to="/home/settings"
            />
          </Stack>

          <Box mt={ 4 } ml={ 2.5 }>
            <SideBarHeader>SUPPORT</SideBarHeader>
          </Box>

          <Stack mt={ 1.5 } spacing={ 0.5 } sx={ { width: "100%" } }>
            <SideBarNavLink
              onClick={ () => props.setMobileOpen(false) }
              icon={ <LiveHelpIcon sx={ { fontSize: "18px" } } /> }
              label="FAQ"
              href="http://newm.io/artists-faq"
            />
            <SideBarNavLink
              onClick={ () => props.setMobileOpen(false) }
              icon={ <TelegramIcon sx={ { fontSize: "18px" } } /> }
              label="ASK THE COMMUNITY"
              href="http://t.me/NEWMartists"
            />
            <SideBarNavLink
              onClick={ () => props.setMobileOpen(false) }
              icon={ <EmailIcon sx={ { fontSize: "18px" } } /> }
              label="SUPPORT"
              href="mailto: support@newm.io"
            />
          </Stack>
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
