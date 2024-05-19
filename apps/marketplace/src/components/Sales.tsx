import { FunctionComponent, ReactNode } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { SongCard } from "@newm-web/components";
import { useRouter } from "next/navigation";
import { usePlayAudioUrl } from "@newm-web/utils";
import SalesSkeleton from "./skeletons/SalesSkeleton";
import { Sale } from "../modules/sale/types";

interface SalesProps {
  readonly hasTitle?: boolean;
  readonly isLoading?: boolean;
  readonly noResultsContent?: string | ReactNode;
  readonly numSkeletons?: number;
  readonly sales: ReadonlyArray<Sale>;
  readonly title?: string | ReactNode;
}

const Sales: FunctionComponent<SalesProps> = ({
  title,
  sales = [],
  isLoading = false,
  hasTitle,
  numSkeletons,
  noResultsContent = "No songs to display at this time.",
}) => {
  const router = useRouter();
  const { audioUrl, isAudioPlaying, playPauseAudio } = usePlayAudioUrl();

  const handleCardClick = (id: string) => {
    router.push(`/sale/${id}`);
  };

  const handleSubtitleClick = (id: string) => {
    router.push(`artist/${id}`);
  };

  if (isLoading) {
    return <SalesSkeleton hasTitle={ hasTitle } numItems={ numSkeletons } />;
  }

  return (
    <Stack alignItems="center">
      { !!title && (
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
        { !isLoading && !sales.length ? (
          <Box flex={ 1 }>
            { typeof noResultsContent === "string" ? (
              <Typography sx={ { marginTop: 8, textAlign: "center" } }>
                { noResultsContent }
              </Typography>
            ) : (
              noResultsContent
            ) }
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
