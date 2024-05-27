import { Skeleton, Stack, useTheme } from "@mui/material";
import {
  InstagramLogo,
  ItunesLogo,
  SoundCloudLogo,
  SpotifyLogo,
  XLogo,
} from "@newm-web/assets";
import { Button } from "@newm-web/elements";
import LanguageIcon from "@mui/icons-material/Language";
import { FunctionComponent } from "react";
import SocialsSkeleton from "./skeletons/SocialsSkeleton";

export interface SocialsProps {
  readonly instagramUrl?: string;
  readonly isLoading?: boolean;
  readonly itunesUrl?: string;
  readonly soundCloudUrl?: string;
  readonly spotifyUrl?: string;
  readonly websiteUrl?: string;
  readonly xUrl?: string;
}

/**
 * Displays social links. Links with undefined values won't be
 * rendered, and links with empty string values will appear as disabled.
 */
const Socials: FunctionComponent<SocialsProps> = ({
  instagramUrl,
  itunesUrl,
  soundCloudUrl,
  spotifyUrl,
  websiteUrl,
  isLoading = false,
  xUrl,
}) => {
  const theme = useTheme();

  const numSkeletonItems = [
    instagramUrl,
    itunesUrl,
    soundCloudUrl,
    spotifyUrl,
    websiteUrl,
    xUrl,
  ].filter((item) => item !== undefined).length;

  console.log("num: ", numSkeletonItems);

  if (isLoading) {
    return <SocialsSkeleton numItems={ numSkeletonItems } />;
  }

  return (
    <Stack direction="row" spacing={ 1 }>
      { websiteUrl !== undefined && (
        <Button
          aria-label="artist website"
          disabled={ !websiteUrl }
          href={ websiteUrl }
          rel="noopener noreferrer"
          target="_blank"
          variant="secondary"
          width="icon"
        >
          <LanguageIcon sx={ { color: theme.colors.basePink } } />
        </Button>
      ) }

      { xUrl !== undefined && (
        <Button
          aria-label="artist X"
          disabled={ !xUrl }
          href={ xUrl }
          rel="noopener noreferrer"
          target="_blank"
          variant="secondary"
          width="icon"
        >
          <XLogo />
        </Button>
      ) }

      { instagramUrl !== undefined && (
        <Button
          aria-label="artist Instagram"
          disabled={ !instagramUrl }
          href={ instagramUrl }
          rel="noopener noreferrer"
          target="_blank"
          variant="secondary"
          width="icon"
        >
          <InstagramLogo />
        </Button>
      ) }

      { spotifyUrl !== undefined && (
        <Button
          aria-label="artist Spotify"
          disabled={ !spotifyUrl }
          href={ spotifyUrl }
          rel="noopener noreferrer"
          target="_blank"
          variant="secondary"
          width="icon"
        >
          <SpotifyLogo />
        </Button>
      ) }

      { itunesUrl !== undefined && (
        <Button
          aria-label="artist Itunes"
          disabled={ !itunesUrl }
          href={ itunesUrl }
          rel="noopener noreferrer"
          target="_blank"
          variant="secondary"
          width="icon"
        >
          <ItunesLogo sx={ { transform: "scale(0.9)" } } />
        </Button>
      ) }

      { soundCloudUrl !== undefined && (
        <Button
          aria-label="artist SoundCloud"
          disabled={ !soundCloudUrl }
          href={ soundCloudUrl }
          rel="noopener noreferrer"
          target="_blank"
          variant="secondary"
          width="icon"
        >
          <SoundCloudLogo />
        </Button>
      ) }
    </Stack>
  );
};

export default Socials;
