import { FunctionComponent, ReactNode } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { SongCard } from "@newm-web/components";
import { useRouter } from "next/navigation";
import { usePlayAudioUrl } from "@newm-web/audio";
import { Sale } from "@newm-web/types";
import { Button } from "@newm-web/elements";
import SalesSkeleton from "./skeletons/SalesSkeleton";

interface SalesProps {
  readonly hasMore?: boolean;
  readonly isLoading?: boolean;
  readonly noResultsContent?: string | ReactNode;
  readonly numSkeletons?: number;
  readonly onLoadMore?: VoidFunction;
  readonly sales?: ReadonlyArray<Sale>;
  readonly title?: string | ReactNode;
}

const Sales: FunctionComponent<SalesProps> = ({
  title,
  sales = [],
  isLoading = false,
  numSkeletons,
  noResultsContent = "No songs to display at this time.",
  onLoadMore,
  hasMore = false,
}) => {
  const router = useRouter();

  const { audioProgress, audioUrl, isAudioPlaying, playPauseAudio } =
    usePlayAudioUrl();

  const handleCardClick = (id: string) => {
    router.push(`/sale/${id}`);
  };

  const handleSubtitleClick = (id: string) => {
    router.push(`/artist/${id}`);
  };

  return (
    <Stack>
      { !!title && !isLoading && (
        <Box mb={ 3.5 }>
          { typeof title === "string" ? (
            <Typography
              fontSize={ ["24px", "24px", "32px"] }
              textAlign="center"
              textTransform="uppercase"
              variant="h3"
            >
              { title }
            </Typography>
          ) : (
            title
          ) }
        </Box>
      ) }

      <Grid justifyContent="flex-start" pb={ 1 } rowGap={ 1.5 } container>
        { !isLoading && !sales.length && (
          <Box flex={ 1 }>
            { typeof noResultsContent === "string" ? (
              <Typography sx={ { marginTop: 8, textAlign: "center" } }>
                { noResultsContent }
              </Typography>
            ) : (
              noResultsContent
            ) }
          </Box>
        ) }

        { sales.map(({ costAmountNewm, costAmountUsd, id, song }) => {
          return (
            <Grid key={ id } md={ 3 } sm={ 4 } xs={ 12 } item>
              <SongCard
                audioProgress={ audioProgress }
                coverArtUrl={ song.coverArtUrl }
                isPlayable={ !!song.clipUrl }
                isPlaying={ audioUrl === song.clipUrl && isAudioPlaying }
                key={ id }
                priceInNewm={ costAmountNewm }
                priceInUsd={ costAmountUsd }
                subtitle={ song.artistName }
                title={ song.title }
                onCardClick={ () => handleCardClick(id) }
                onPlayPauseClick={ () => playPauseAudio(song.clipUrl) }
                onSubtitleClick={ () => handleSubtitleClick(song.artistId) }
              />
            </Grid>
          );
        }) }
      </Grid>

      { isLoading && (
        <Stack>
          <SalesSkeleton
            hasTitle={ !!title && sales.length === 0 }
            numItems={ numSkeletons }
          />
        </Stack>
      ) }

      { !isLoading && hasMore && (
        <Stack alignItems="center" mt={ 4 }>
          <Button variant="secondary" onClick={ onLoadMore }>
            See more
          </Button>
        </Stack>
      ) }
    </Stack>
  );
};

export default Sales;
