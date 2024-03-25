"use client";
import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import { FunctionComponent } from "react";
import { resizeCloudinaryImage, useBetterMediaQuery } from "@newm-web/utils";
import { Button, ProfileImage } from "@newm-web/elements";
import { CheckCircle } from "@mui/icons-material";
import { Socials } from "@newm-web/components";
import { ItemHeader } from "../../../components";

interface ArtistProps {
  readonly params: {
    readonly id: string;
  };
}

const Artist: FunctionComponent<ArtistProps> = ({ params }) => {
  const theme = useTheme();

  const isAboveMdBreakpoint = useBetterMediaQuery(
    `(min-width: ${theme.breakpoints.values.md}px)`
  );

  // temp data
  const artist = mockArtists[0];

  // const profileImageSize = 200;
  const resizedCoverImage = resizeCloudinaryImage(artist.coverImageUrl, {
    height: 200,
    width: 1600,
  });

  return (
    <Stack direction="column">
      <ItemHeader title="ARTIST PAGE" />

      <Box
        sx={ {
          backgroundImage: `url(${resizedCoverImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "200px",
          width: "100%",
        } }
      />

      <Container sx={ { flexGrow: 1 } }>
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
            <Box
              pb={ 1 }
              position="relative"
              top={ ["0px", "0px", theme.spacing(-2)] }
            >
              <ProfileImage
                height={ 200 }
                src={ resizeCloudinaryImage(artist.profileImageUrl, {
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
                  fontSize={ ["24px", "24px", "32px"] }
                  textAlign={ ["center", "center", "left"] }
                  textTransform="uppercase"
                  variant="h3"
                >
                  { artist.firstName }{ " " }
                  <Box
                    component="span"
                    display="inline-block"
                    whiteSpace="nowrap"
                  >
                    { artist.lastName }
                    { artist.isVerified && (
                      <Box component="span" display="inline-block" ml={ 1.5 }>
                        <CheckCircle
                          sx={ {
                            color: theme.colors.green,
                            mb: [-0.5, -0.5, "-0.5px"],
                          } }
                        />
                      </Box>
                    ) }
                  </Box>
                </Typography>
              </Stack>

              <Typography
                sx={ { color: theme.colors.grey100, fontWeight: 400 } }
                variant="subtitle1"
              >
                { artist.location }
              </Typography>

              { isAboveMdBreakpoint && (
                <Box pt={ 3.5 }>
                  <Button color="music" variant="outlined" width="compact">
                    About
                  </Button>
                </Box>
              ) }
            </Stack>
          </Stack>

          <Socials
            instagramUrl={ artist.instagramUrl }
            itunesUrl={ artist.itunesUrl }
            soundCloudUrl={ artist.soundCloudUrl }
            spotifyUrl={ artist.spotifyUrl }
            websiteUrl={ artist.websiteUrl }
            xUrl={ artist.xUrl }
          />

          { !isAboveMdBreakpoint && (
            <Box alignSelf="stretch" pt={ 1.5 }>
              <Button color="music" variant="outlined" width="full">
                About
              </Button>
            </Box>
          ) }
        </Stack>
      </Container>
    </Stack>
  );
};

export default Artist;

const mockArtists = [
  {
    coverImageUrl:
      "https://res.cloudinary.com/newm/image/upload/v1680991027/cvjbuze1tqft5srafmzg.jpg",
    firstName: "Johnny",
    id: "abcd1234",
    instagramUrl: "",
    isVerified: true,
    itunesUrl: "",
    lastName: "Appleseed",
    location: "Barcelona, Spain",
    profileImageUrl:
      "https://res.cloudinary.com/newm/image/upload/v1701715430/pzeo4bcivjouksomeggy.jpg",
    soundCloudUrl: "https://www.example.com",
    spotifyUrl: "https://www.example.com",
    websiteUrl: "https://www.example.com",
    xUrl: "https://www.example.com",
  },
];
