import { Container, Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";

const ItemSkeleton: FunctionComponent = () => (
  <Container sx={ { flexGrow: 1, mt: 5 } }>
    <Stack alignItems="center" mt={ 2.5 }>
      <Skeleton
        sx={ { height: [150, 150, 400], width: [150, 150, 400] } }
        variant="rectangular"
      />
    </Stack>
  </Container>
);

export default ItemSkeleton;
