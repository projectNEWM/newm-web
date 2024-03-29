import { Box, Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";

const SongCardSkeleton: FunctionComponent = () => (
  <Stack mb={ 6.25 } position="relative">
    <img
      alt="Square placeholder"
      src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      width="100%"
    />

    <Box
      bottom={ 0 }
      left={ 0 }
      padding={ 1.5 }
      position="absolute"
      right={ 0 }
      top={ 0 }
    >
      <Skeleton height="100%" variant="rectangular" width="100%" />
      <Skeleton height={ 30 } width={ 100 } />
      <Skeleton height={ 20 } width={ 60 } />
    </Box>
  </Stack>
);

export default SongCardSkeleton;
