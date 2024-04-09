import { Box, Container, Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";

const ItemSkeleton: FunctionComponent = () => (
  <Container maxWidth="md" sx={ { flexGrow: 1, mt: 5 } }>
    <Stack direction={ "row" } mt={ 2.5 }>
      <Box height={ 400 } mr={ 5 } p={ 1.5 } width={ 400 }>
        <Skeleton
          sx={ { height: "100%", width: "100%" } }
          variant="rectangular"
        />
      </Box>
      <Stack height={ 440 } p={ 1.5 } width={ 440 }>
        <Skeleton height={ 38 } width={ 120 } />
        <Skeleton height={ 16 } width={ 60 } />
        <Skeleton sx={ { height: "100%", width: "100%" } } variant="text" />
        <Stack alignItems={ "center" } direction={ "row" } gap={ 1.5 }>
          <Skeleton height={ 40 } variant="circular" width={ 40 } />
          <Skeleton height={ 20 } width={ 120 } />
        </Stack>
      </Stack>
    </Stack>
  </Container>
);

export default ItemSkeleton;
