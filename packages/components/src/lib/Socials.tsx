import { Stack, useTheme } from "@mui/material";
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

interface SocialsProps {
  readonly instagramUrl?: string;
  readonly itunesUrl?: string;
  readonly soundCloudUrl?: string;
  readonly spotifyUrl?: string;
  readonly websiteUrl?: string;
  readonly xUrl?: string;
}

const Socials: FunctionComponent<SocialsProps> = ({
  instagramUrl,
  itunesUrl,
  soundCloudUrl,
  spotifyUrl,
  websiteUrl,
  xUrl,
}) => {
  const theme = useTheme();

  return (
    <Stack direction="row" mt={ 2.5 } spacing={ 1 }>
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
