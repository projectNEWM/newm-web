"use client";
import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { resizeCloudinaryImage, useBetterMediaQuery } from "@newm-web/utils";
import { ItemHeader, ProfileHeader, ProfileModal } from "@newm-web/components";
import { useRouter } from "next/navigation";

interface ArtistProps {
  readonly params: {
    readonly id: string;
  };
}

const Artist: FunctionComponent<ArtistProps> = ({ params }) => {
  const router = useRouter();
  const theme = useTheme();
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const isAboveSmBreakpoint = useBetterMediaQuery(
    `(min-width: ${theme.breakpoints.values.sm}px)`
  );

  // temp data
  const artist = mockArtists[0];

  const resizedCoverImage = resizeCloudinaryImage(artist.coverImageUrl, {
    height: 200,
    width: 1600,
  });

  const socials = {
    instagramUrl: artist.instagramUrl,
    itunesUrl: artist.itunesUrl,
    soundCloudUrl: artist.soundCloudUrl,
    spotifyUrl: artist.spotifyUrl,
    websiteUrl: artist.websiteUrl,
    xUrl: artist.xUrl,
  };

  return (
    <Stack direction="column">
      <Box px={ [2, 2, 7.5] } py={ [2, 2, 7.5] }>
        <ItemHeader title="ARTIST PAGE" onGoBack={ router.back } />
      </Box>

      <Box
        sx={ {
          backgroundImage: `url(${resizedCoverImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: isAboveSmBreakpoint ? "200px" : "130px",
          width: "100%",
        } }
      />

      <Container sx={ { flexGrow: 1 } }>
        <ProfileHeader
          firstName={ artist.firstName }
          isVerified={ artist.isVerified }
          lastName={ artist.lastName }
          location={ artist.location }
          profileImageUrl={ artist.profileImageUrl }
          socials={ {
            instagramUrl: artist.instagramUrl,
            itunesUrl: artist.itunesUrl,
            soundCloudUrl: artist.soundCloudUrl,
            spotifyUrl: artist.spotifyUrl,
            websiteUrl: artist.websiteUrl,
            xUrl: artist.xUrl,
          } }
          onClickAbout={ () => setIsAboutModalOpen(true) }
        />
      </Container>

      <ProfileModal
        isCloseButtonVisible={ false }
        isOpen={ isAboutModalOpen }
        name={ `${artist.firstName} ${artist.lastName}` }
        socials={ socials }
        onClose={ () => setIsAboutModalOpen(false) }
      >
        <Typography variant="subtitle1">{ artist.description }</Typography>
      </ProfileModal>
    </Stack>
  );
};

export default Artist;

const mockArtists = [
  {
    coverImageUrl:
      "https://res.cloudinary.com/newm/image/upload/v1680991027/cvjbuze1tqft5srafmzg.jpg",
    description: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
      velit esse cillum dolore eu fugiat nulla pariatur.`,
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
