import { Skeleton, Stack } from "@mui/material";

export const SongCardSkeleton = () => (
  <Stack>
    <Skeleton height={ 260 } variant="rectangular" width={ 260 } />
    <Skeleton height={ 30 } width={ 100 } />
    <Skeleton height={ 20 } width={ 60 } />
  </Stack>
);
