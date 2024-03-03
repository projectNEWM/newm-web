import { Box, Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";

interface ArtistSkeletonProps {
  readonly orientation: "row" | "column";
}

const ArtistSkeleton: FunctionComponent<ArtistSkeletonProps> = ({
  orientation,
}) => (
  <Stack spacing={ 1.25 }>
    <Box>
      <Skeleton height={ 200 } variant="circular" width={ 200 } />
    </Box>

    <Stack
      alignItems={ orientation === "column" ? "center" : "row" }
      direction={ orientation }
      spacing={ 0.25 }
    >
      <Skeleton height={ 30 } width={ 100 } />
      <Skeleton height={ 20 } width={ 60 } />
    </Stack>
  </Stack>
);

export default ArtistSkeleton;
