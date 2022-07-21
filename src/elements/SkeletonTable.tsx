import theme from "theme";
import { Box, Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";

const SkeletonTable: FunctionComponent = () => (
  <Box
    mt={ 2 }
    pt={ 4 }
    px={ 4 }
    maxWidth="1200px"
    sx={ { backgroundColor: theme.colors.grey600 } }
  >
    <Stack columnGap={ 4 } display="grid" gridTemplateColumns="repeat(3, minmax(72px, 1fr))">
      <Skeleton height="40px" width="72px" />
      <Skeleton height="40px" width="72px" />
      <Skeleton height="40px" width="72px" />
    </Stack>

    <Stack
      display="grid"
      columnGap={ 4 }
      rowGap={ 3 }
      mt={ 3 }
      pb={ 4 }
      justifyContent="space-around"
      gridTemplateColumns="repeat(3, minmax(100px, 1fr))"
    >
      <Skeleton height="24px" />
      <Skeleton height="24px" />
      <Skeleton height="24px" />

      <Skeleton height="24px" />
      <Skeleton height="24px" />
      <Skeleton height="24px" />

      <Skeleton height="24px" />
      <Skeleton height="24px" />
      <Skeleton height="24px" />

      <Skeleton height="24px" />
      <Skeleton height="24px" />
      <Skeleton height="24px" />

      <Skeleton height="24px" />
      <Skeleton height="24px" />
      <Skeleton height="24px" />

      <Skeleton height="24px" />
      <Skeleton height="24px" />
      <Skeleton height="24px" />

      <Skeleton height="24px" />
      <Skeleton height="24px" />
      <Skeleton height="24px" />

      <Skeleton height="24px" />
      <Skeleton height="24px" />
      <Skeleton height="24px" />

      <Skeleton height="24px" />
      <Skeleton height="24px" />
      <Skeleton height="24px" />

      <Skeleton height="24px" />
      <Skeleton height="24px" />
      <Skeleton height="24px" />
    </Stack>
    <Stack display="flex" flexDirection="row" justifyContent="space-between" pb={ 4 } >
      <Skeleton height="40px" width="100px" />
      <Skeleton height="40px" width="100px" />
    </Stack>
  </Box>
);

export default SkeletonTable;
