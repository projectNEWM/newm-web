"use client";
import { Box, Container, Stack, Typography } from "@mui/material";
import { SongCard } from "@newm-web/components";
import { FunctionComponent, useEffect, useState } from "react";
import { resizeCloudinaryImage } from "@newm-web/utils";
import { ProfileImage } from "@newm-web/elements";
import MoreSongs from "../../../components/MoreSongs";
import { mockArtist, mockSongs } from "../../../temp/data";
import { ItemSkeleton, SimilarSongs } from "../../../components";

interface SingleSongProps {
  readonly params: {
    readonly songId: string;
  };
}

const SingleSong: FunctionComponent<SingleSongProps> = ({ params }) => {
  const [isLoading, setIsLoading] = useState(true);
  const songData = mockSongs.find((song) => song.id === params.songId);
  const artist = mockArtist;

  // TEMP: simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <ItemSkeleton />;
  }

  return (
    <Container>
      <Container maxWidth="md" sx={ { flexGrow: 1, mt: [0, 0, 5] } }>
        <Stack
          alignItems={ ["center", "center", "start"] }
          direction={ ["column", "column", "row"] }
        >
          <Box mb={ [2, 2, 0] } mr={ [0, 0, 5] } width={ [240, 240, 400] }>
            <SongCard
              coverArtUrl={ songData?.coverArtUrl }
              imageDimensions={ 480 }
              isPlayable={ true }
              price={ mockSongs[0].price }
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onCardClick={ () => {} }
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onPriceClick={ () => {} }
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onSubtitleClick={ () => {} }
            />
          </Box>
          <Stack
            gap={ [4, 4, 2.5] }
            pt={ [0, 0, 1.5] }
            textAlign={ ["center", "center", "left"] }
            width={ ["100%", 440, 440] }
          >
            <Stack gap={ 0.5 }>
              <Typography variant="h3">{ songData?.title }</Typography>
              <Typography
                color={ (theme) => theme.colors.grey300 }
                variant="subtitle2"
              >
                { songData?.isExplicit ? "Explicit" : null }
              </Typography>
            </Stack>
            <Typography textAlign={ "left" } variant="subtitle1">
              { songData?.description }
            </Typography>
            <Stack
              alignItems={ "center" }
              direction={ "row" }
              gap={ 1.5 }
              justifyContent={ ["center", "center", "start"] }
            >
              <ProfileImage
                height={ 40 }
                src={ resizeCloudinaryImage(songData?.artist.profileImageUrl, {
                  height: 56,
                  width: 56,
                }) }
                width={ 40 }
              />
              <Typography variant="h4">
                { songData?.artist.firstName } { songData?.artist.lastName }
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>

      <MoreSongs artist={ mockArtist } />

      <SimilarSongs song={ songData } />
    </Container>
  );
};

export default SingleSong;
