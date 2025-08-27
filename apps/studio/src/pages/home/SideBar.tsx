import { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ProfileImage,
  SideBarHeader,
  SideBarNavLink,
} from "@newm-web/elements";
import { DiscordLogo, NEWMLogo } from "@newm-web/assets";
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
  LocalStorage,
  resizeCloudinaryImage,
  useWindowDimensions,
} from "@newm-web/utils";
import theme from "@newm-web/theme";
import { useFlags } from "launchdarkly-react-client-sdk";
import { LocalStorageKey } from "@newm-web/types";
import {
  NEWM_CLICKUP_FORM_URL,
  NEWM_IO_URL,
  NEWM_STUDIO_DISCORD_URL,
  NEWM_STUDIO_FAQ_URL,
} from "../../common";
import { emptyProfile, useGetProfileQuery } from "../../modules/session";
import { ReferralBanner } from "../../components";

interface SideBarProps {
  mobileVersion?: boolean;
  setMobileOpen: (field: boolean) => void;
}

export const SideBar: FunctionComponent<SideBarProps> = ({
  mobileVersion,
  setMobileOpen,
}: SideBarProps) => {
  const theme = useTheme();

  const [isReferralBannerDismissed, setIsReferralBannerDismissed] =
    useState(true);

  const { data: { firstName, lastName, nickname, pictureUrl } = emptyProfile } =
    useGetProfileQuery();

  const { webStudioArtistReferralCampaign } = useFlags();

  const [isCloseButtonVisible, setIsCloseButtonVisible] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const lastCallToActionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!webStudioArtistReferralCampaign) return;

    setIsReferralBannerDismissed(
      LocalStorage.getItem(LocalStorageKey.isReferralBannerDismissed) === "true"
    );
  }, [webStudioArtistReferralCampaign]);

  const handleReferralBannerDismiss = () => {
    setIsReferralBannerDismissed(true);
    LocalStorage.setItem(LocalStorageKey.isReferralBannerDismissed, "true");
  };

  // Function to check if the banner is near the bottom
  const checkIfBannerIsNearBottom = () => {
    if (!sidebarRef.current) return;

    const sidebar = sidebarRef.current;
    const banner = sidebar.querySelector(".referral-banner") as HTMLElement;

    if (!banner) return;

    const bannerBottom = banner.offsetTop;

    // Adjust the threshold as needed
    if (!lastCallToActionRef.current) return;
    const lastCallToAction = lastCallToActionRef.current;
    const threshold =
      lastCallToAction.offsetTop + lastCallToAction.clientHeight;

    setIsCloseButtonVisible(bannerBottom < threshold);
  };

  useEffect(() => {
    if (!sidebarRef.current) return;

    const sidebar = sidebarRef.current;

    sidebar.addEventListener("scroll", checkIfBannerIsNearBottom);

    checkIfBannerIsNearBottom(); // Initial check

    return () => {
      sidebar.removeEventListener("scroll", checkIfBannerIsNearBottom);
    };
    // When referral banner is dismissed the banner position will change
  }, [isReferralBannerDismissed]);

  return (
    <Box
      ref={ sidebarRef }
      sx={ {
        background: theme.colors.black,
        borderRight: `2px solid ${theme.colors.grey600}`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        minWidth: theme.spacing(28.75),
        overflowY: "auto",
        padding: 1.25,
        width: theme.spacing(28.75),
      } }
    >
      { mobileVersion && (
        <IconButton
          sx={ {
            position: "absolute",
            right: "-2.5rem",
            top: "2rem",
          } }
          onClick={ () => setMobileOpen(false) }
        >
          <MenuOpenIcon sx={ { color: "white" } } />
        </IconButton>
      ) }

      <Box alignItems="center" display="flex" flexDirection="column">
        <Stack mt={ 3.5 } spacing={ 2 }>
          { !!pictureUrl && (
            <ProfileImage
              aria-label="profile image"
              referrerPolicy="no-referrer"
              src={ resizeCloudinaryImage(pictureUrl, {
                height: 280,
                width: 280,
              }) }
            />
          ) }

          <Typography align="center" fontWeight={ 700 } variant="h4">
            { nickname ? nickname : firstName + " " + lastName }
          </Typography>
        </Stack>

        <Box mb={ 2 } mt={ 3 } width="100%">
          <SideBarNavLink
            Icon={ UploadIcon }
            label="UPLOAD A SONG"
            to="/home/upload-song"
            onClick={ () => setMobileOpen(false) }
          />

          <Box ml={ 2 } mt={ 3 }>
            <SideBarHeader>MY CAREER</SideBarHeader>
          </Box>

          <Stack mt={ 0.75 } spacing={ 0.5 } sx={ { width: "100%" } }>
            <SideBarNavLink
              Icon={ LibraryIcon }
              label="LIBRARY"
              to="/home/library"
              onClick={ () => setMobileOpen(false) }
            />

            <SideBarNavLink
              Icon={ CollaboratorsIcon }
              label="COLLABORATORS"
              to="/home/collaborators"
              onClick={ () => setMobileOpen(false) }
            />
          </Stack>

          <Box ml={ 2.5 } mt={ 2.5 }>
            <SideBarHeader>MY PERFORMANCE</SideBarHeader>
          </Box>

          <Stack mt={ 0.75 } spacing={ 0.5 } sx={ { width: "100%" } }>
            <SideBarNavLink
              Icon={ WalletIcon }
              label="WALLET"
              to="/home/wallet"
              onClick={ () => setMobileOpen(false) }
            />
          </Stack>

          <Box ml={ 2.5 } mt={ 2.5 }>
            <SideBarHeader>MY SETTINGS</SideBarHeader>
          </Box>

          <Stack mt={ 0.75 } spacing={ 0.5 } sx={ { width: "100%" } }>
            <SideBarNavLink
              Icon={ ProfileIcon }
              label="PROFILE"
              to="/home/profile"
              onClick={ () => setMobileOpen(false) }
            />

            <SideBarNavLink
              Icon={ SettingsIcon }
              label="SETTINGS"
              to="/home/settings"
              onClick={ () => setMobileOpen(false) }
            />
          </Stack>

          <Box ml={ 2.5 } mt={ 2.5 }>
            <SideBarHeader>SUPPORT</SideBarHeader>
          </Box>

          <Stack
            mt={ 1.5 }
            ref={ lastCallToActionRef }
            spacing={ 0.5 }
            sx={ { width: "100%" } }
          >
            <SideBarNavLink
              href={ NEWM_STUDIO_FAQ_URL }
              Icon={ FaqIcon }
              label="FAQ"
              onClick={ () => setMobileOpen(false) }
            />
            <SideBarNavLink
              href={ NEWM_STUDIO_DISCORD_URL }
              Icon={ DiscordLogo }
              label="ASK THE COMMUNITY"
              onClick={ () => setMobileOpen(false) }
            />
            <SideBarNavLink
              href={ NEWM_CLICKUP_FORM_URL }
              Icon={ SupportIcon }
              label="SUBMIT A TICKET"
              onClick={ () => setMobileOpen(false) }
            />
          </Stack>
        </Box>
      </Box>

      { webStudioArtistReferralCampaign && (
        <Box
          bottom={ 0 }
          className="referral-banner"
          mb={ 1 }
          mt="auto"
          mx={ -1 }
          position={ !isReferralBannerDismissed ? "sticky" : undefined }
          zIndex={ 2 }
        >
          <ReferralBanner
            isCloseButtonVisible={ isCloseButtonVisible }
            isReferralBannerDismissed={ isReferralBannerDismissed }
            onBannerDismiss={ handleReferralBannerDismiss }
          />
        </Box>
      ) }

      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        pb={ 2.5 }
        px={ 2.5 }
        width="100%"
      >
        <Link
          alignItems="center"
          display="flex"
          href={ NEWM_IO_URL }
          justifyContent="center"
          rel="noopener"
          target="_blank"
        >
          <NEWMLogo height="40" width="40" />
        </Link>
      </Box>
    </Box>
  );
};

interface ResponsiveSideBarProps {
  isMobileOpen: boolean;
  setMobileOpen: (field: boolean) => void;
}

const ResponsiveSideBar: FunctionComponent<ResponsiveSideBarProps> = ({
  isMobileOpen,
  setMobileOpen,
}: ResponsiveSideBarProps) => {
  const container =
    window !== undefined ? () => window.document.body : undefined;

  const windowWidth = useWindowDimensions()?.width;

  return windowWidth && windowWidth < theme.breakpoints.values.md ? (
    <Drawer
      container={ container }
      ModalProps={ {
        keepMounted: true,
      } }
      open={ isMobileOpen }
      sx={ {
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          overflow: isMobileOpen ? "visible" : "hidden",
        },
      } }
      variant="temporary"
      onClose={ () => setMobileOpen(false) }
    >
      <IconButton
        sx={ {
          position: "absolute",
          right: "-2.5rem",
          top: "2rem",
        } }
        onClick={ () => setMobileOpen(false) }
      >
        <MenuOpenIcon sx={ { color: "white" } } />
      </IconButton>
      <SideBar setMobileOpen={ setMobileOpen } mobileVersion />
    </Drawer>
  ) : (
    <Drawer
      sx={ {
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
        },
      } }
      variant="permanent"
      open
    >
      <SideBar setMobileOpen={ setMobileOpen } />
    </Drawer>
  );
};

export default ResponsiveSideBar;
