"use client";
import { Container, Stack, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { ProfileHeader, ProfileModal } from "@newm-web/components";
import { useGetArtistQuery } from "../../../modules/artist";
import { ArtistSongs, BannerImage, SimilarArtists } from "../../../components";

interface ArtistProps {
  readonly params: {
    readonly artistId: string;
  };
}

const Artist: FunctionComponent<ArtistProps> = ({ params }) => {
  const { isLoading, data: artist } = useGetArtistQuery(params.artistId);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const socials = {
    instagramUrl: artist?.instagramUrl || "",
    itunesUrl: artist?.appleMusicProfile || "",
    soundCloudUrl: artist?.soundCloudProfile || "",
    spotifyUrl: artist?.spotifyProfile || "",
    websiteUrl: artist?.websiteUrl || "",
    xUrl: artist?.twitterUrl || "",
  };

  return (
    <>
      <Stack direction="column">
        { /* TODO: replace with banner image url when available */ }
        <BannerImage imageUrl={ "" } isLoading={ isLoading } />

        <Container sx={ { flexGrow: 1 } }>
          <ProfileHeader
            isLoading={ isLoading }
            isVerified={ true }
            location={ artist?.location }
            name={ artist?.name }
            pictureUrl={ artist?.pictureUrl }
            socials={ socials }
            onClickAbout={ () => setIsAboutModalOpen(true) }
          />

          <ArtistSongs />

          <SimilarArtists artistId={ artist?.id } genre={ artist?.genre } />
        </Container>
      </Stack>

      <ProfileModal
        isOpen={ isAboutModalOpen }
        name={ artist?.name }
        socials={ socials }
        onClose={ () => setIsAboutModalOpen(false) }
      >
        <Typography variant="subtitle1">{ artist?.biography }</Typography>
      </ProfileModal>
    </>
  );
};

export default Artist;
