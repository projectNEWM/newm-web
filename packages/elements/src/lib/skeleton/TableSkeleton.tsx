import theme from "@newm-web/theme";
import { Box, Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";

interface SkeletonTableProps {
  cols?: number;
  maxWidth?: string | number;
  rows?: number;
}

const SkeletonTable: FunctionComponent<SkeletonTableProps> = ({
  cols = 3,
  rows = 10,
  maxWidth = 1200,
}) => {
  return (
    <Box
      data-testid="table-skeleton"
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
          <Skeleton height="40px" key={ i } width="72px" />
        )) }
      </Stack>

      <Stack
        columnGap={ 4 }
        display="grid"
        gridTemplateColumns={ `repeat(${cols}, minmax(100px, 1fr))` }
        justifyContent="space-around"
        mt={ 3 }
        pb={ 4 }
        rowGap={ 3 }
      >
        { Array.from({ length: cols * rows }, (_, i) => (
          <Skeleton height="24px" key={ i } />
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
