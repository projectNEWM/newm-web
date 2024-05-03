import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { SongCard } from "@newm-web/components";
import { useRouter } from "next/navigation";
import { mockSongs } from "../temp/data";

interface SongsProps {
  readonly songs: typeof mockSongs;
  readonly title?: string | ReactNode;
}

/**
 * TODO: Implement useGetSongsQuery and playback functionality,
 * see studio/src/pages/home/owners/Songs.tsx
 */
const Songs: FunctionComponent<SongsProps> = ({ title, songs }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const handleTitleClick = (id: string) => {
    router.push(`/item/${id}`);
  };

  /**
   * TEMP: simulate loading
   */
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Stack alignItems="center">
      { songs.length ? (
        <>
          { !!title && (
            <Box mb={ 3.5 }>
              <Typography
                fontSize={ ["24px", "24px", "32px"] }
                textAlign="center"
                textTransform="uppercase"
                variant="h3"
              >
                { title }
              </Typography>
            </Box>
          ) }

          <Grid justifyContent="center" pb={ 1 } rowGap={ 1.5 } container>
            { mockSongs.map((song) => {
              const genresString = song.genres.join(", ");

              return (
                <Grid key={ song.id } md={ 3 } sm={ 4 } xs={ 6 } item>
                  <SongCard
                    coverArtUrl={ song.coverArtUrl }
                    isLoading={ isLoading }
                    isPlayable={ !!song.streamUrl }
                    key={ song.id }
                    priceInNEWM={ song.priceInNEWM }
                    priceInUSD={ song.priceInUSD }
                    subtitle={ genresString }
                    title={ song.title }
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onCardClick={ () => handleTitleClick(song.id) }
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onSubtitleClick={ () => {} }
                  />
                </Grid>
              );
            }) }
          </Grid>
        </>
      ) : (
        <Typography sx={ { marginTop: 8, textAlign: "center" } }>
          No songs to display at this time.
        </Typography>
      ) }
    </Stack>
  );
};

export default Songs;
