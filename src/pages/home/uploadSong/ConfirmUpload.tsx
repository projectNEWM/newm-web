import { Box, Stack, useTheme } from "@mui/material";
import { useWindowDimensions } from "common";
import { Button, Checkbox, Typography } from "elements";
import { useFormikContext } from "formik";
import { UploadSongFormValues, selectSong } from "modules/song";
import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { ViewPDF } from "components";
import agreementPreview from "assets/images/artist-agreement-preview.jpg";

const ConfirmUpload: FunctionComponent = () => {
  const theme = useTheme();

  const { isLoading, artistAgreement } = useSelector(selectSong);

  const [hasViewedAgreement, setHasViewedAgreement] = useState(false);

  const { values } = useFormikContext<UploadSongFormValues>();

  const windowWidth = useWindowDimensions()?.width;

  const handleViewPDF = () => {
    setHasViewedAgreement(true);
  };

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

        <ViewPDF
          isViewed={ hasViewedAgreement }
          onViewPDF={ handleViewPDF }
          data={ artistAgreement }
          preview={ agreementPreview }
        />
      </Stack>

      <Stack direction="column" mt={ 3 } spacing={ 2 }>
        <Typography variant="subtitle1" color="white" fontSize={ 12 }>
          <Checkbox sx={ { marginRight: 1.5 } } disabled={ !hasViewedAgreement } />I
          confirm that I am the exclusive creator of{ " " }
          <strong>{ values.title }</strong>.
        </Typography>

        <Typography variant="subtitle1" color="white" fontSize={ 12 }>
          <Checkbox sx={ { marginRight: 1.5 } } disabled={ !hasViewedAgreement } />
          By &apos;Requesting Minting&apos; you agree to this contract.
        </Typography>
      </Stack>

      <Box mt={ 3 }>
        <Typography variant="subtitle1" fontSize={ 12 } color="white">
          The minting process has a fee of <strong>₳6.00</strong> and may take
          3-15 days to complete.
        </Typography>
      </Box>

      <Box mt={ 6 }>
        <Button
          type="submit"
          isLoading={ isLoading }
          width={
            windowWidth && windowWidth > theme.breakpoints.values.md
              ? "compact"
              : "default"
          }
        >
          Upload & Request Minting
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmUpload;
