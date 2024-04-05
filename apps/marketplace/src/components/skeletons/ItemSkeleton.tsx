import { Box, Container, Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";

const ItemSkeleton: FunctionComponent = () => (
  <Container maxWidth="md" sx={ { flexGrow: 1, mt: 5 } }>
    <Stack mt={ 2.5 }>
      <Box height={ 400 } p={ 1.5 } width={ 400 }>
        <Skeleton
          sx={ { height: "100%", width: "100%" } }
          variant="rectangular"
        />
      </Box>
    </Stack>
  </Container>
);

export default ItemSkeleton;
