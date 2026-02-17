import { FunctionComponent } from "react";
import { Skeleton, Stack } from "@mui/material";

interface PortfolioSkeletonProps {
  readonly count?: number;
}

const PortfolioSkeleton: FunctionComponent<PortfolioSkeletonProps> = ({
  count = 1,
}) => {
  return (
    <Stack gap={ 1.5 }>
      { Array.from({ length: count }).map((_, index) => (
        <Stack
          alignItems="center"
          direction="row"
          gap={ 1.5 }
          key={ index }
          minHeight={ 40 }
        >
          <Skeleton height={ 32 } variant="circular" width={ 32 } />
          <Skeleton width={ 240 } />
          <Skeleton sx={ { ml: "auto" } } width={ 50 } />
        </Stack>
      )) }
    </Stack>
  );
};

export default PortfolioSkeleton;
