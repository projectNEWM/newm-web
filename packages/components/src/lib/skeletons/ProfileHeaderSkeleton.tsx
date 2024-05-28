import { Box, Skeleton, Stack, useTheme } from "@mui/material";
import { useBetterMediaQuery } from "@newm-web/utils";
import { FunctionComponent } from "react";
import SocialsSkeleton from "./SocialsSkeleton";

const ProfileHeaderSkeleton: FunctionComponent = () => {
  const theme = useTheme();

  const isBelowMdBreakpoint = useBetterMediaQuery(
    `(max-width: ${theme.breakpoints.values.md}px)`
  );

  return (
    <Stack
      alignItems={ ["center", "center", "flex-start"] }
      direction={ ["column", "column", "row"] }
      justifyContent="space-between"
      mt={ [-12.5, -12.5, 0] }
      px={ 2.5 }
    >
      <Stack
        alignItems="center"
        direction={ ["column", "column", "row"] }
        spacing={ 4 }
      >
        <Box pb={ 2 } position="relative" top={ [0, 0, theme.spacing(-2)] }>
          <Skeleton height={ 200 } variant="circular" width={ 200 } />
        </Box>

        <Stack
          alignItems={ ["center", "center", "flex-start"] }
          direction="column"
          px={ 5 }
          spacing={ 1 }
        >
          <Skeleton height={ 36 } variant="rectangular" width={ 280 } />
          <Skeleton height={ 12 } variant="rectangular" width={ 120 } />

          { !isBelowMdBreakpoint && (
            <Box pt={ 3.5 }>
              <Skeleton height={ 38 } variant="rectangular" width={ 100 } />
            </Box>
          ) }
        </Stack>
      </Stack>

      <Box mt={ 2.5 }>
        <SocialsSkeleton numItems={ 6 } />
      </Box>

      { isBelowMdBreakpoint && (
        <Box alignSelf="stretch" pt={ 1.5 }>
          <Skeleton height={ 40 } variant="rectangular" width="100%" />
        </Box>
      ) }
    </Stack>
  );
};

export default ProfileHeaderSkeleton;
