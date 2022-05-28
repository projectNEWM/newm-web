import { FunctionComponent } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { UploadImage } from "components";
import { useTheme } from "@mui/material/styles";
import { Typography } from "elements";

const UploadSong: FunctionComponent = () => {
  const theme = useTheme();

  return (
    <Box p={ 7.5 } sx={ { width: "100%", maxWidth: theme.breakpoints.values.md } }>
      <Typography variant="h3" fontWeight="extra-bold">
        UPLOAD SONG
      </Typography>

      <Box pt={ 5 }>
        <Grid container spacing={ 2 }>
          <Grid item xs={ 6 }>
            <Stack spacing={ 0.5 }>
              <Typography color="grey100" fontWeight="medium">
                MUSIC
              </Typography>

              <UploadImage />
            </Stack>
          </Grid>

          <Grid item xs={ 6 }>
            <Stack spacing={ 0.5 }>
              <Typography color="grey100" fontWeight="medium">
                SONG COVER ART
              </Typography>

              <UploadImage />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UploadSong;
