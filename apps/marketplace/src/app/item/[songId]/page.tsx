"use client";
import { Container, Stack } from "@mui/material";
import { SongCard } from "@newm-web/components";
import { FunctionComponent, useEffect, useState } from "react";
import { mockSongs } from "../../../temp/data";
import { ItemSkeleton } from "../../../components";

interface SingleSongProps {
  readonly params: {
    readonly songId: string;
  };
}

const SingleSong: FunctionComponent<SingleSongProps> = ({ params }) => {
  // TEMP: simulate data loading
  const [isLoading, setIsLoading] = useState(true);

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
    <Container sx={ { flexGrow: 1, mt: 5 } }>
      <Stack alignItems="center" mt={ 2.5 } width="400px">
        <SongCard
          coverArtUrl={
            mockSongs.find((song) => song.id === params.songId)?.coverArtUrl
          }
          isPlayable={ true }
          price="3.0"
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onCardClick={ () => {} }
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onPriceClick={ () => {} }
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onSubtitleClick={ () => {} }
        />
      </Stack>
    </Container>
  );
};

export default SingleSong;
