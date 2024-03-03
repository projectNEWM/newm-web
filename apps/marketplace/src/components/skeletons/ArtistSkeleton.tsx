import { Box, Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";

interface ArtistSkeletonProps {
  readonly orientation: "row" | "column";
}

const ArtistSkeleton: FunctionComponent<ArtistSkeletonProps> = ({
  orientation,
}) => (
  <Stack spacing={ 0.25 }>
    <Box pb={ 2 } px={ 3.5 }>
      <Skeleton height={ 200 } variant="circular" width={ 200 } />
    </Box>

    <Stack
      alignItems={ orientation === "column" ? "center" : "row" }
      direction={ orientation }
    >
      <Skeleton height={ 30 } width={ 100 } />
      <Skeleton height={ 20 } width={ 60 } />
    </Stack>
  </Stack>
);

export default ArtistSkeleton;
