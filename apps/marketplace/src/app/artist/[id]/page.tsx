"use client";
import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { resizeCloudinaryImage, useBetterMediaQuery } from "@newm-web/utils";
import { ItemHeader, ProfileHeader, ProfileModal } from "@newm-web/components";
import { useRouter } from "next/navigation";
import { mockArtist } from "../../../temp/data";

interface ArtistProps {
  readonly params: {
    readonly id: string;
  };
}

const Artist: FunctionComponent<ArtistProps> = ({ params }) => {
  const router = useRouter();
  const theme = useTheme();
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const isBelowSmBreakpoint = useBetterMediaQuery(
    `(max-width: ${theme.breakpoints.values.sm}px)`
  );

  const resizedCoverImage = resizeCloudinaryImage(mockArtist.coverImageUrl, {
    height: 200,
    width: 1600,
  });

  const socials = {
    instagramUrl: mockArtist.instagramUrl,
    itunesUrl: mockArtist.itunesUrl,
    soundCloudUrl: mockArtist.soundCloudUrl,
    spotifyUrl: mockArtist.spotifyUrl,
    websiteUrl: mockArtist.websiteUrl,
    xUrl: mockArtist.xUrl,
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
          height: isBelowSmBreakpoint ? "130px" : "200px",
          width: "100%",
        } }
      />

      <Container sx={ { flexGrow: 1 } }>
        <ProfileHeader
          firstName={ mockArtist.firstName }
          isVerified={ mockArtist.isVerified }
          lastName={ mockArtist.lastName }
          location={ mockArtist.location }
          profileImageUrl={ mockArtist.profileImageUrl }
          socials={ {
            instagramUrl: mockArtist.instagramUrl,
            itunesUrl: mockArtist.itunesUrl,
            soundCloudUrl: mockArtist.soundCloudUrl,
            spotifyUrl: mockArtist.spotifyUrl,
            websiteUrl: mockArtist.websiteUrl,
            xUrl: mockArtist.xUrl,
          } }
          onClickAbout={ () => setIsAboutModalOpen(true) }
        />
      </Container>

      <ProfileModal
        isCloseButtonVisible={ false }
        isOpen={ isAboutModalOpen }
        name={ `${mockArtist.firstName} ${mockArtist.lastName}` }
        socials={ socials }
        onClose={ () => setIsAboutModalOpen(false) }
      >
        <Typography variant="subtitle1">{ mockArtist.description }</Typography>
      </ProfileModal>
    </Stack>
  );
};

export default Artist;
