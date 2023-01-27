import { Box, Stack } from "@mui/material";
import LaunchIcon from "assets/images/LaunchIcon";
import { IconMessage, SolidOutline } from "components";
import { Typography } from "elements";
import { FunctionComponent } from "react";

const ConfirmUpload: FunctionComponent = () => {
  return (
    <Box maxWidth={ "500px" }>
      <Stack direction="column" spacing={ 1 } mb={ 5 }>
        <Typography fontWeight={ 700 }>ONE LAST THING</Typography>

        <Typography fontSize={ 12 } variant="subtitle1">
          You&apos;re almost ready to mint! To proceed, please review your
          ownership contract and follow the steps below.
        </Typography>
      </Stack>

      <Stack direction="column" spacing={ 1 }>
        <Typography fontWeight={ 500 } color="grey100">
          View your contract here
        </Typography>

        <SolidOutline
          sx={ {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            padding: 2,
          } }
        >
          <IconMessage icon={ <LaunchIcon /> } message="Preview contract" />
        </SolidOutline>
      </Stack>
    </Box>
  );
};

export default ConfirmUpload;
