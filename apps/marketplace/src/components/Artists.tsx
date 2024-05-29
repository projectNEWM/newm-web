import { FunctionComponent } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import ArtistsSkeleton from "./skeletons/ArtistsSkeleton";
import Artist from "./Artist";
import { Artist as ArtistItem } from "../modules/artist";
import { gridSizeColumnMap } from "../common";

interface ArtistsProps {
  readonly artists?: ReadonlyArray<ArtistItem>;
  readonly hasTitle?: boolean;
  readonly isLoading?: boolean;
  readonly itemOrientation: "row" | "column";
  readonly numSkeletons?: number;
  readonly title?: string;
}

const Artists: FunctionComponent<ArtistsProps> = ({
  hasTitle = true,
  isLoading = false,
  itemOrientation,
  numSkeletons = 10,
  artists = [],
  title,
}) => {
  const router = useRouter();

  const handleSelectArtist = (id: string) => {
    router.push(`/artist/${id}`);
  };

  if (isLoading) {
    return (
      <Stack alignItems="center" mt={ 17 }>
        <ArtistsSkeleton
          hasTitle={ hasTitle }
          itemOrientation={ itemOrientation }
          numItems={ numSkeletons }
        />
      </Stack>
    );
  }

  return (
    <Stack>
      <Stack alignItems="center" mb={ 3.5 } mt={ 17 }>
        <Typography fontSize={ ["24px", "24px", "32px"] } variant="h3">
          { title }
        </Typography>
      </Stack>

      <Grid justifyContent="flex-start" rowGap={ 5 } container>
        { !isLoading && !artists.length ? (
          <Box flex={ 1 }>
            <Typography sx={ { marginTop: 8, textAlign: "center" } }>
              No artists to display at this time.
            </Typography>
          </Box>
        ) : (
          artists.map(({ id, pictureUrl, name, marketplaceSongCount }, idx) => {
            return (
              <Grid
                display="flex"
                justifyContent="center"
                key={ id }
                lg={ gridSizeColumnMap.lg[itemOrientation] }
                md={ gridSizeColumnMap.md[itemOrientation] }
                sm={ gridSizeColumnMap.sm[itemOrientation] }
                xs={ gridSizeColumnMap.xs[itemOrientation] }
                item
              >
                <Artist
                  imageUrl={ pictureUrl }
                  isLoading={ isLoading }
                  orientation={ itemOrientation }
                  subtitle={ `${marketplaceSongCount} songs` }
                  title={ name }
                  onSelectArtist={ () => handleSelectArtist(id) }
                />
              </Grid>
            );
          })
        ) }
      </Grid>
    </Stack>
  );
};

export default Artists;
