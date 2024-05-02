import { FunctionComponent, ReactNode } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { SongCard } from "@newm-web/components";
import { useRouter } from "next/navigation";
import { SongCardSkeleton } from "@newm-web/elements";
import { Sale } from "../modules/sale/types";

interface SongsProps {
  readonly isLoading?: boolean;
  readonly sales: ReadonlyArray<Sale>;
  readonly title?: string | ReactNode;
}

const Songs: FunctionComponent<SongsProps> = ({
  title,
  sales = [],
  isLoading = false,
}) => {
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/item/${id}`);
  };

  const handleSubtitleClick = (id: string) => {
    router.push(`artist/${id}`);
  };

  const handlePlayPauseClick = () => {
    // play song here
  };

  if (!isLoading && !sales.length) {
    return (
      <Typography sx={ { marginTop: 8, textAlign: "center" } }>
        No songs to display at this time.
      </Typography>
    );
  }

  return (
    <Stack alignItems="center">
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

      <Grid justifyContent="flex-start" pb={ 1 } rowGap={ 1.5 } container>
        { isLoading
          ? new Array(8).fill(null).map((_, idx) => {
              return (
                <Grid key={ idx } md={ 3 } sm={ 4 } xs={ 6 } item>
                  <SongCardSkeleton
                    isSubtitleVisible={ true }
                    isTitleVisible={ true }
                  />
                </Grid>
              );
            })
          : sales.map(({ costAmount, id, song }) => {
              const genresString = song.genres.join(", ");

              return (
                <Grid key={ song.id } md={ 3 } sm={ 4 } xs={ 6 } item>
                  <SongCard
                    coverArtUrl={ song.coverArtUrl }
                    isPlayable={ !!song.clipUrl }
                    key={ id }
                    price={ String(costAmount) }
                    subtitle={ genresString }
                    title={ song.title }
                    onCardClick={ () => handleCardClick(id) }
                    onPlayPauseClick={ () => handlePlayPauseClick() }
                    onSubtitleClick={ () => handleSubtitleClick(id) }
                  />
                </Grid>
              );
            }) }
      </Grid>
    </Stack>
  );
};

export default Songs;
