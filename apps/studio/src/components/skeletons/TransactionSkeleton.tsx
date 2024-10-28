import { FunctionComponent } from "react";
import { Skeleton, Stack } from "@mui/material";

interface TransactionSkeletonProps {
  readonly count?: number;
}

const TransactionSkeleton: FunctionComponent<TransactionSkeletonProps> = ({
  count = 1,
}) => {
  return (
    <Stack gap={ 1.5 }>
      { Array.from({ length: count }).map((_, index) => (
        <Stack alignItems="center" direction="row" gap={ 1.5 } key={ index }>
          <Skeleton height={ 32 } variant="rectangular" width={ 32 } />
          <Stack>
            <Skeleton width={ 285 } />
            <Skeleton width={ 32 } />
          </Stack>
          <Skeleton height={ 20 } sx={ { ml: "auto" } } width={ 50 } />
        </Stack>
      )) }
    </Stack>
  );
};

export default TransactionSkeleton;
