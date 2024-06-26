import { Box, Grid, Skeleton, Stack } from "@mui/material";
import { SongCardSkeleton } from "@newm-web/components";
import { FunctionComponent } from "react";

interface SalesSkeletonProps {
  readonly hasTitle?: boolean;
  readonly numItems?: number;
}

const SalesSkeleton: FunctionComponent<SalesSkeletonProps> = ({
  hasTitle = true,
  numItems = 8,
}) => {
  return (
    <Stack alignItems="center">
      { hasTitle && (
        <Box maxWidth="100%" mb={ 3.5 } overflow="hidden">
          <Skeleton
            sx={ { fontSize: ["24px", "24px", "32px"] } }
            variant="rectangular"
            width={ 480 }
          />
        </Box>
      ) }

      <Grid justifyContent="flex-start" pb={ 1 } rowGap={ 1.5 } container>
        { new Array(numItems).fill(null).map((_, idx) => {
          return (
            <Grid key={ idx } md={ 3 } sm={ 4 } xs={ 6 } item>
              <SongCardSkeleton
                isPriceVisible={ true }
                isSubtitleVisible={ true }
                isTitleVisible={ true }
              />
            </Grid>
          );
        }) }
      </Grid>
    </Stack>
  );
};

export default SalesSkeleton;
