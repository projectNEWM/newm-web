import theme from "theme";
import { Box, Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";

interface SkeletonTableProps {
  cols?: number;
  rows?: number;
  maxWidth?: string | number;
}

const SkeletonTable: FunctionComponent<SkeletonTableProps> = ({
  cols = 3,
  rows = 10,
  maxWidth = 1200,
}) => {
  return (
    <Box
      maxWidth={ maxWidth }
      mt={ 2 }
      pt={ 4 }
      px={ 4 }
      sx={ { backgroundColor: theme.colors.grey600 } }
    >
      <Stack
        columnGap={ 4 }
        display="grid"
        gridTemplateColumns={ `repeat(${cols}, minmax(72px, 1fr))` }
      >
        { Array.from({ length: cols }, (_, i) => (
          <Skeleton key={ i } height="40px" width="72px" />
        )) }
      </Stack>

      <Stack
        display="grid"
        columnGap={ 4 }
        rowGap={ 3 }
        mt={ 3 }
        pb={ 4 }
        justifyContent="space-around"
        gridTemplateColumns={ `repeat(${cols}, minmax(100px, 1fr))` }
      >
        { Array.from({ length: cols * rows }, (_, i) => (
          <Skeleton key={ i } height="24px" />
        )) }
      </Stack>
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        pb={ 4 }
      >
        <Skeleton height="40px" width="100px" />
        <Skeleton height="40px" width="100px" />
      </Stack>
    </Box>
  );
};

export default SkeletonTable;
