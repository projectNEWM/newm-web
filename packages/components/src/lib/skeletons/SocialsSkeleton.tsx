import { Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";

interface SocialsSkeletonProps {
  readonly numItems: number;
}

const SocialsSkeleton: FunctionComponent<SocialsSkeletonProps> = ({
  numItems,
}) => {
  return (
    <Stack direction="row" spacing={ 1 }>
      { new Array(numItems).fill(null).map((_, idx) => {
        return (
          <Skeleton height={ 40 } key={ idx } variant="rectangular" width={ 40 } />
        );
      }) }
    </Stack>
  );
};

export default SocialsSkeleton;
