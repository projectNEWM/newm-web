import { Box, useTheme } from "@mui/material";
import { useWindowDimensions } from "common";
import { Button, Typography } from "elements";
import { useFormikContext } from "formik";
import { UploadSongRequest } from "modules/song";
import { FunctionComponent } from "react";
import { ConfirmContract } from "components";

const ConfirmAgreement: FunctionComponent = () => {
  const theme = useTheme();

  const { values, setFieldValue, isSubmitting } =
    useFormikContext<UploadSongRequest>();

  const windowWidth = useWindowDimensions()?.width;

  const handleConsentToContract = (value: boolean) => {
    setFieldValue("consentsToContract", value);
  };

  return (
    <Box maxWidth={ "500px" } marginX={ ["auto", "auto", "unset"] }>
      <Typography mb={ 1.5 }>
        You&apos;re almost ready. Please review your ownership contract.
      </Typography>

      <ConfirmContract
        songTitle={ values.title }
        isCoCreator={ values.owners.length > 1 }
        onConfirm={ handleConsentToContract }
      />

      <Box mt={ 6 }>
        <Button
          type="submit"
          isLoading={ isSubmitting }
          disabled={ !values.consentsToContract }
          width={
            windowWidth && windowWidth > theme.breakpoints.values.md
              ? "compact"
              : "default"
          }
        >
          Distribute & Mint
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmAgreement;
