import { Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";

interface ArtistSkeletonProps {
  readonly orientation: "row" | "column";
}

const ArtistSkeleton: FunctionComponent<ArtistSkeletonProps> = ({
  orientation,
}) => (
  <Stack
    direction={ orientation }
    p={ 1.5 }
    spacing={ orientation === "column" ? 1.25 : 4 }
  >
    <Skeleton
      sx={ { height: [150, 150, 200], width: [150, 150, 200] } }
      variant="circular"
    />

    <Stack
      alignItems={ orientation === "column" ? "center" : "flex-start" }
      direction="column"
      justifyContent="center"
      spacing={ 0.25 }
    >
      <Skeleton height={ 30 } width={ 120 } />
      <Skeleton height={ 20 } width={ 60 } />
    </Stack>
  </Stack>
);

export default ArtistSkeleton;
