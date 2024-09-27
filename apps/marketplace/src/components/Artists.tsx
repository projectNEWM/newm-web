import { FunctionComponent } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Button } from "@newm-web/elements";
import ArtistsSkeleton from "./skeletons/ArtistsSkeleton";
import Artist from "./Artist";
import { Artist as ArtistItem } from "../modules/artist";
import { gridSizeColumnMap } from "../common";

interface ArtistsProps {
  readonly artists?: ReadonlyArray<ArtistItem>;
  readonly hasMore?: boolean;
  readonly isLoading?: boolean;
  readonly itemOrientation: "row" | "column";
  readonly numSkeletons?: number;
  readonly onLoadMore?: VoidFunction;
  readonly title?: string;
}

const Artists: FunctionComponent<ArtistsProps> = ({
  isLoading = false,
  itemOrientation,
  numSkeletons = 10,
  artists = [],
  title,
  hasMore = false,
  onLoadMore,
}) => {
  const router = useRouter();

  const handleSelectArtist = (id: string) => {
    router.push(`/artist/${id}`);
  };

  return (
    <Stack mt={ 17 }>
      { !!title && !isLoading && (
        <Stack alignItems="center" mb={ 3.5 }>
          <Typography fontSize={ ["24px", "24px", "32px"] } variant="h3">
            { title }
          </Typography>
        </Stack>
      ) }

      <Grid justifyContent="flex-start" rowGap={ 5 } container>
        { !isLoading && !artists.length && (
          <Box flex={ 1 }>
            <Typography sx={ { marginTop: 8, textAlign: "center" } }>
              No artists to display at this time.
            </Typography>
          </Box>
        ) }

        { artists.map(({ id, pictureUrl, name, marketplaceSongCount }) => {
          return (
            <Grid
              display="flex"
              item={ true }
              justifyContent="center"
              key={ id }
              lg={ gridSizeColumnMap.lg[itemOrientation] }
              md={ gridSizeColumnMap.md[itemOrientation] }
              sm={ gridSizeColumnMap.sm[itemOrientation] }
              xs={ gridSizeColumnMap.xs[itemOrientation] }
            >
              <Artist
                imageUrl={ pictureUrl }
                orientation={ itemOrientation }
                subtitle={ `${marketplaceSongCount} songs` }
                title={ name }
                onSelectArtist={ () => handleSelectArtist(id) }
              />
            </Grid>
          );
        }) }
      </Grid>

      { isLoading && (
        <Stack mt={ 4.25 }>
          <ArtistsSkeleton
            hasTitle={ !!title && artists.length === 0 }
            itemOrientation={ itemOrientation }
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

export default Artists;
