import { Box, Grid, Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";
import ArtistSkeleton from "./ArtistSkeleton";

interface SalesSkeletonProps {
  readonly hasTitle?: boolean;
  readonly itemOrientation: "column" | "row";
  readonly numItems?: number;
}

const SalesSkeleton: FunctionComponent<SalesSkeletonProps> = ({
  hasTitle = true,
  numItems = 10,
  itemOrientation,
}) => {
  return (
    <Stack alignItems="center">
      { hasTitle && (
        <Box mb={ 3.5 }>
          <Skeleton height={ 76 } width={ 480 } />
        </Box>
      ) }

      <Grid justifyContent="flex-start" pb={ 1 } rowGap={ 1.5 } container>
        { new Array(numItems).fill(null).map((_, idx) => {
          return (
            <Grid
              key={ idx }
              lg={ itemOrientation === "column" ? 2.4 : 3 }
              md={ 3 }
              sm={ 4 }
              xs={ 6 }
              item
            >
              <ArtistSkeleton orientation={ itemOrientation } />
            </Grid>
          );
        }) }
      </Grid>
    </Stack>
  );
};

export default SalesSkeleton;
