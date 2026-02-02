import { FunctionComponent, useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { Box, Typography } from "@mui/material";
import { Button } from "@newm-web/elements";
import OrderSummaryDialog from "./OrderSummaryDialog";
import { UploadSongThunkRequest } from "../../../modules/song";
import { ConfirmContract } from "../../../components";

interface ConfirmAgreementProps {
  readonly shouldShowOrderSummary?: boolean;
}

const ConfirmAgreement: FunctionComponent<ConfirmAgreementProps> = ({
  shouldShowOrderSummary = true,
}) => {
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);

  const { values, setFieldValue, isSubmitting } =
    useFormikContext<UploadSongThunkRequest>();

  const handleConsentToContract = (value: boolean) => {
    setFieldValue("consentsToContract", value);
  };

  const handleButtonClick = () => {
    if (shouldShowOrderSummary) {
      setIsOrderSummaryOpen(!isOrderSummaryOpen);
    }
  };

  // Reset consent to contract when unmounting
  useEffect(() => {
    return () => {
      setFieldValue("consentsToContract", false);
    };
  }, [setFieldValue]);

  return (
    <Box marginX={ ["auto", "auto", "unset"] } maxWidth={ "500px" }>
      <Typography mb={ 1.5 }>
        You&apos;re almost ready. Please ensure all necessary release details
        have been updated and review your ownership contract.
      </Typography>

      <ConfirmContract
        songTitle={ values.title }
        onConfirm={ handleConsentToContract }
      />

      <Box mt={ 3 }>
        <Button
          disabled={ !values.consentsToContract }
          isLoading={ isSubmitting }
          type={ shouldShowOrderSummary ? "button" : "submit" }
          width="compact"
          onClick={ handleButtonClick }
        >
          { shouldShowOrderSummary ? "Proceed to checkout" : "Resubmit release" }
        </Button>

        { shouldShowOrderSummary && (
          <OrderSummaryDialog
            open={ isOrderSummaryOpen }
            onClose={ () => setIsOrderSummaryOpen(false) }
          />
        ) }
      </Box>
    </Box>
  );
};

export default ConfirmAgreement;
