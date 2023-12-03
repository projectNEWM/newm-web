import { FunctionComponent } from "react";
import { Box, Drawer, IconButton, Stack, useTheme } from "@mui/material";
import { Typography } from "@newm-web/elements";
import {
  SideBarHeader,
  SideBarNavLink,
  ProfileImage,
} from "@newm-web/elements";
import { emptyProfile, useGetProfileQuery } from "../../modules/session";
import { DiscordLogo, NEWMLogoSmInverse } from "@newm-web/assets";
import {
  PeopleAlt as CollaboratorsIcon,
  LiveHelp as FaqIcon,
  FolderCopy as LibraryIcon,
  MenuOpen as MenuOpenIcon,
  Star as ProfileIcon,
  Settings as SettingsIcon,
  Email as SupportIcon,
  FileUploadOutlined as UploadIcon,
  AccountBalanceWalletRounded as WalletIcon,
} from "@mui/icons-material";
import {
  NEWM_CLICKUP_FORM_URL,
  NEWM_STUDIO_DISCORD_URL,
  NEWM_STUDIO_FAQ_URL,
} from "../../common";

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
      sx={{
        background: theme.colors.black,
        borderRight: `2px solid ${theme.colors.grey600}`,
        display: "flex",
        height: "100%",
        width: theme.spacing(28.75),
        minWidth: theme.spacing(28.75),
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 1.25,
        overflowY: "auto",
      }}
    >
      {props.mobileVersion && (
        <IconButton
          onClick={() => props.setMobileOpen(false)}
          sx={{
            position: "absolute",
            top: "2rem",
            right: "-2.5rem",
          }}
        >
          <MenuOpenIcon sx={{ color: "white" }} />
        </IconButton>
      )}

      <Box display="flex" flexDirection="column" alignItems="center">
        <Stack mt={3.5} spacing={2}>
          {!!pictureUrl && (
            <ProfileImage
              src={pictureUrl}
              aria-label="profile image"
              referrerPolicy="no-referrer"
            />
          )}

          <Typography variant="h4" fontWeight={700} align="center">
            {nickname ? nickname : firstName + " " + lastName}
          </Typography>
        </Stack>

        <Box mt={4} mb={3} width="100%">
          <SideBarNavLink
            onClick={() => props.setMobileOpen(false)}
            Icon={UploadIcon}
            label="UPLOAD A SONG"
            to="/home/upload-song"
          />

          <Box mt={3.5} ml={2.5}>
            <SideBarHeader>MY CAREER</SideBarHeader>
          </Box>

          <Stack mt={0.75} spacing={0.5} sx={{ width: "100%" }}>
            <SideBarNavLink
              onClick={() => props.setMobileOpen(false)}
              Icon={LibraryIcon}
              label="LIBRARY"
              to="/home/library"
            />

            <SideBarNavLink
              onClick={() => props.setMobileOpen(false)}
              Icon={CollaboratorsIcon}
              label="COLLABORATORS"
              to="/home/collaborators"
            />
          </Stack>

          <Box mt={3.5} ml={2.5}>
            <SideBarHeader>MY PERFORMANCE</SideBarHeader>
          </Box>

          <Stack mt={0.75} spacing={0.5} sx={{ width: "100%" }}>
            <SideBarNavLink
              onClick={() => props.setMobileOpen(false)}
              Icon={WalletIcon}
              label="WALLET"
              to="/home/wallet"
            />
          </Stack>

          <Box mt={3.5} ml={2.5}>
            <SideBarHeader>MY SETTINGS</SideBarHeader>
          </Box>

          <Stack mt={0.75} spacing={0.5} sx={{ width: "100%" }}>
            <SideBarNavLink
              onClick={() => props.setMobileOpen(false)}
              Icon={ProfileIcon}
              label="PROFILE"
              to="/home/profile"
            />

            <SideBarNavLink
              onClick={() => props.setMobileOpen(false)}
              Icon={SettingsIcon}
              label="SETTINGS"
              to="/home/settings"
            />
          </Stack>

          <Box mt={4} ml={2.5}>
            <SideBarHeader>SUPPORT</SideBarHeader>
          </Box>

          <Stack mt={1.5} spacing={0.5} sx={{ width: "100%" }}>
            <SideBarNavLink
              onClick={() => props.setMobileOpen(false)}
              Icon={FaqIcon}
              label="FAQ"
              href={NEWM_STUDIO_FAQ_URL}
            />
            <SideBarNavLink
              onClick={() => props.setMobileOpen(false)}
              Icon={DiscordLogo}
              label="ASK THE COMMUNITY"
              href={NEWM_STUDIO_DISCORD_URL}
            />
            <SideBarNavLink
              onClick={() => props.setMobileOpen(false)}
              Icon={SupportIcon}
              label="SUPPORT"
              href={NEWM_CLICKUP_FORM_URL}
            />
          </Stack>
        </Box>
      </Box>

      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        pb={2.5}
        px={2.5}
        width="100%"
      >
        <NEWMLogoSmInverse />
      </Box>
    </Box>
  );
};

interface ResponsiveSideBarProps {
  isMobileOpen: boolean;
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
        container={container}
        variant="temporary"
        open={props.isMobileOpen}
        onClose={() => props.setMobileOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            overflow: props.isMobileOpen ? "visible" : "hidden",
            boxSizing: "border-box",
          },
        }}
      >
        <IconButton
          onClick={() => props.setMobileOpen(false)}
          sx={{
            position: "absolute",
            top: "2rem",
            right: "-2.5rem",
          }}
        >
          <MenuOpenIcon sx={{ color: "white" }} />
        </IconButton>
        <SideBar mobileVersion setMobileOpen={props.setMobileOpen} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
          },
        }}
        open
      >
        <SideBar setMobileOpen={props.setMobileOpen} />
      </Drawer>
    </>
  );
};

export default ResponsiveSideBar;
