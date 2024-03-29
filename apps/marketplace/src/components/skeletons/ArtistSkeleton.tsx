import { Box, Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";

interface ArtistSkeletonProps {
  readonly orientation: "row" | "column";
}

const ArtistSkeleton: FunctionComponent<ArtistSkeletonProps> = ({
  orientation,
}) => (
  <Stack p={ 1.5 } spacing={ 1.25 }>
    <Box>
      <Skeleton
        sx={ { height: [150, 150, 200], width: [150, 150, 200] } }
        variant="circular"
      />
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
