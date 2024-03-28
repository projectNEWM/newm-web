"use client";
import { Container, Stack } from "@mui/material";
import { SongCard } from "@newm-web/components";
import { FunctionComponent } from "react";

interface SingleSongProps {
  params: { songId: string };
}

const SingleSong: FunctionComponent<SingleSongProps> = ({ params }) => {
  return (
    // Route it to use tempSongs to create unique slugs for each temp song using dynamic routes
    //https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
    <Container sx={ { flexGrow: 1, mt: 5 } }>
      <Stack alignItems="center" mt={ 2.5 }>
        { /* TODO: Create preview progress bar using a test song */ }
        <SongCard
          coverArtUrl={
            "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1706033133/efpgmcjwk8glctlwfzm8.png"
          }
          isPlayable={ true }
          price="3.0"
          size="Large"
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onPriceClick={ () => {} }
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onSubtitleClick={ () => {} }
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onTitleClick={ () => {} }
        />
      </Stack>
    </Container>
  );
};

export default SingleSong;
