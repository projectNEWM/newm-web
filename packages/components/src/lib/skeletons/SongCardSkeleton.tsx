import { Box, Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";

interface SongCardSkeletonProps {
  readonly isPriceVisible?: boolean;
  readonly isSubtitleVisible?: boolean;
  readonly isTitleVisible?: boolean;
}

const SongCardSkeleton: FunctionComponent<SongCardSkeletonProps> = ({
  isTitleVisible = true,
  isSubtitleVisible = true,
  isPriceVisible = false,
}) => (
  <Stack mb={ 6.25 } position="relative" width="100%">
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
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="column">
          { isTitleVisible && <Skeleton height={ 30 } width={ 100 } /> }
          { isSubtitleVisible && <Skeleton height={ 20 } width={ 60 } /> }
        </Stack>
        <Stack alignItems="flex-end" direction="column">
          { isPriceVisible && <Skeleton height={ 30 } width={ 80 } /> }
          { isPriceVisible && <Skeleton height={ 18 } width={ 60 } /> }
        </Stack>
      </Stack>
    </Box>
  </Stack>
);

export default SongCardSkeleton;
