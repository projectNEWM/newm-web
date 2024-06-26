import { Box, Stack, Typography, useTheme } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Button, ProfileImage } from "@newm-web/elements";
import { resizeCloudinaryImage, useBetterMediaQuery } from "@newm-web/utils";
import { FunctionComponent } from "react";
import Socials, { SocialsProps } from "./Socials";
import ProfileHeaderSkeleton from "./skeletons/ProfileHeaderSkeleton";

interface ProfileHeaderProps {
  readonly isLoading?: boolean;
  readonly isVerified?: boolean;
  readonly location?: string;
  readonly name?: string;
  readonly onClickAbout: VoidFunction;
  readonly pictureUrl?: string;
  readonly socials: SocialsProps;
}

const ProfileHeader: FunctionComponent<ProfileHeaderProps> = ({
  name,
  location,
  onClickAbout,
  pictureUrl,
  socials,
  isLoading,
  isVerified = false,
}) => {
  const theme = useTheme();

  const isBelowMdBreakpoint = useBetterMediaQuery(
    `(max-width: ${theme.breakpoints.values.md}px)`
  );

  if (isLoading) {
    return <ProfileHeaderSkeleton />;
  }

  return (
    <Stack
      alignItems={ ["center", "center", "flex-start"] }
      direction={ ["column", "column", "row"] }
      justifyContent="space-between"
      mt={ [-12.5, -12.5, 0] }
      px={ 2.5 }
    >
      <Stack
        alignItems="center"
        direction={ ["column", "column", "row"] }
        spacing={ 4 }
      >
        <Box pb={ 1 } position="relative" top={ [0, 0, theme.spacing(-2)] }>
          <ProfileImage
            height={ 200 }
            src={ resizeCloudinaryImage(pictureUrl, {
              height: 280,
              width: 280,
            }) }
            width={ 200 }
          />
        </Box>

        <Stack
          alignItems={ ["center", "center", "flex-start"] }
          direction="column"
          px={ 5 }
          spacing={ 0.5 }
        >
          <Stack alignItems="center" direction="row" spacing={ 1.5 }>
            <Typography
              display="inline-block"
              fontSize={ ["24px", "24px", "32px"] }
              textAlign={ ["center", "center", "left"] }
              textTransform="uppercase"
              variant="h3"
              whiteSpace="nowrap"
            >
              { name }{ " " }
              { isVerified && (
                <Box component="span" display="inline-block" ml={ 1.5 }>
                  <CheckCircle
                    sx={ {
                      color: theme.colors.green,
                      mb: [-0.5, -0.5, "-0.5px"],
                    } }
                  />
                </Box>
              ) }
            </Typography>
          </Stack>

          <Typography
            sx={ { color: theme.colors.grey100, fontWeight: 400 } }
            variant="subtitle1"
          >
            { location }
          </Typography>

          { !isBelowMdBreakpoint && (
            <Box pt={ 3.5 }>
              <Button
                color="music"
                variant="secondary"
                width="compact"
                onClick={ onClickAbout }
              >
                About
              </Button>
            </Box>
          ) }
        </Stack>
      </Stack>

      <Box mt={ 2.5 }>
        <Socials
          instagramUrl={ socials.instagramUrl }
          itunesUrl={ socials.itunesUrl }
          soundCloudUrl={ socials.soundCloudUrl }
          spotifyUrl={ socials.spotifyUrl }
          websiteUrl={ socials.websiteUrl }
          xUrl={ socials.xUrl }
        />
      </Box>

      { isBelowMdBreakpoint && (
        <Box alignSelf="stretch" pt={ 1.5 }>
          <Button
            color="music"
            variant="secondary"
            width="full"
            onClick={ onClickAbout }
          >
            About
          </Button>
        </Box>
      ) }
    </Stack>
  );
};

export default ProfileHeader;
