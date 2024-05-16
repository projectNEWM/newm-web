import { FunctionComponent, ReactNode } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { SongCard, SongCardSkeleton } from "@newm-web/components";
import { useRouter } from "next/navigation";
import { usePlayAudioUrl } from "@newm-web/utils";
import { Sale } from "../modules/sale/types";

interface SalesProps {
  readonly isLoading?: boolean;
  readonly numSkeletons?: number;
  readonly sales: ReadonlyArray<Sale>;
  readonly title?: string | ReactNode;
}

const Sales: FunctionComponent<SalesProps> = ({
  title,
  sales = [],
  isLoading = false,
  numSkeletons = 8,
}) => {
  const router = useRouter();
  const { audioUrl, isAudioPlaying, playPauseAudio } = usePlayAudioUrl();

  const handleCardClick = (id: string) => {
    router.push(`/sale/${id}`);
  };

  const handleSubtitleClick = (id: string) => {
    router.push(`artist/${id}`);
  };

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
        { isLoading ? (
          new Array(numSkeletons).fill(null).map((_, idx) => {
            return (
              <Grid key={ idx } md={ 3 } sm={ 4 } xs={ 6 } item>
                <SongCardSkeleton
                  isPriceVisible={ true }
                  isSubtitleVisible={ true }
                  isTitleVisible={ true }
                />
              </Grid>
            );
          })
        ) : !sales.length ? (
          <Box flex={ 1 }>
            <Typography sx={ { marginTop: 8, textAlign: "center" } }>
              No songs to display at this time.
            </Typography>
          </Box>
        ) : (
          sales.map(({ costAmount, costAmountUsd, id, song }) => {
            const genresString = song.genres.join(", ");

            return (
              <Grid key={ song.id } md={ 3 } sm={ 4 } xs={ 6 } item>
                <SongCard
                  coverArtUrl={ song.coverArtUrl }
                  isPlayable={ !!song.clipUrl }
                  isPlaying={ audioUrl === song.clipUrl && isAudioPlaying }
                  key={ id }
                  priceInNewm={ costAmount }
                  priceInUsd={ costAmountUsd }
                  subtitle={ genresString }
                  title={ song.title }
                  onCardClick={ () => handleCardClick(id) }
                  onPlayPauseClick={ () => playPauseAudio(song.clipUrl) }
                  onSubtitleClick={ () => handleSubtitleClick(id) }
                />
              </Grid>
            );
          })
        ) }
      </Grid>
    </Stack>
  );
};

export default Sales;
