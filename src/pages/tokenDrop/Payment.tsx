import { Box, Stack, useTheme } from "@mui/material";
import { DisplayText } from "components";
import { Typography } from "elements";
import { FunctionComponent } from "react";
import mursProfileImageXs from "assets/images/murs-profile-small.png";

const Payment: FunctionComponent = () => {
  const theme = useTheme();
  return (
    <Box display="flex">
      <Box
        display="flex"
        flexGrow={ 1 }
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box
          flex={ 1 }
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
          <Box mb={ 1 }>
            <Typography variant="subtitle2" fontWeight={ 600 }>
              WHAT YOU GET
            </Typography>
          </Box>

          <Box mb={ 0.25 }>
            <Typography variant="subtitle1">
              <DisplayText>2%</DisplayText> of
            </Typography>
          </Box>

          <Typography variant="subtitle1">
            future streaming royalties
          </Typography>

          <Stack
            spacing={ 2 }
            direction="row"
            alignItems="center"
            sx={ {
              mt: 1,
              backgroundColor: theme.colors.grey600,
              borderRadius: "6px",
              padding: 1.25,
              paddingRight: 4,
            } }
          >
            <img
              src={ mursProfileImageXs }
              style={ { width: 40, height: 40, borderRadius: "50%" } }
              alt="murs profile"
            />

            <Box flexDirection="column">
              <Typography variant="h4" fontWeight={ 700 }>
                Break up
              </Typography>
              <Typography variant="subtitle2">Murs</Typography>
            </Box>
          </Stack>
        </Box>

        <Box flexDirection="column" flex={ 1 }>
          <Box mb={ 1 }>
            <Typography variant="subtitle2" fontWeight={ 600 }>
              WHAT YOU PAY
            </Typography>
          </Box>

          <Box mb={ 0.25 }>
            <DisplayText>42 ADA</DisplayText>
          </Box>

          <Typography variant="subtitle1">~37.54 USD</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Payment;
