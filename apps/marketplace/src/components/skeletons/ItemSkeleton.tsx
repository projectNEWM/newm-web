import { Box, Container, Skeleton, Stack } from "@mui/material";
import { FunctionComponent } from "react";

const ItemSkeleton: FunctionComponent = () => (
  <Container maxWidth="md" sx={ { flexGrow: 1, mt: [0, 0, 5] } }>
    <Stack
      alignItems={ ["center", "center", "start"] }
      direction={ ["column", "column", "row"] }
    >
      <Box
        height={ [240, 240, 400] }
        mb={ [2, 2, 0] }
        mr={ [0, 0, 5] }
        p={ 1.5 }
        width={ [240, 240, 400] }
      >
        <Skeleton sx={ { height: "100%", width: "100%" } } variant="rounded" />
      </Box>
      <Stack
        alignItems={ ["center", "center", "start"] }
        gap={ [4, 4, 2.5] }
        pt={ [0, 0, 1.5] }
        width={ ["100%", 440, 440] }
      >
        <Stack alignItems={ ["center", "center", "start"] } gap={ 0.5 }>
          <Skeleton height={ 38 } width={ 120 } />
          <Skeleton height={ 16 } width={ 60 } />
        </Stack>
        <Skeleton height={ 88 } variant="text" width="100%" />
        <Stack
          alignItems="center"
          direction="row"
          gap={ 1.5 }
          justifyContent={ ["center", "center", "start"] }
        >
          <Skeleton height={ 40 } variant="circular" width={ 40 } />
          <Skeleton height={ 20 } width={ 120 } />
        </Stack>
        <Stack mt={ 4.5 } width="100%">
          <Box>
            <Skeleton height={ 124 } variant="rounded" width={ "100%" } />
          </Box>
          <Box pt={ 2.5 }>
            <Skeleton height={ 80 } variant="rounded" width={ "100%" } />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  </Container>
);

export default ItemSkeleton;
