import { FunctionComponent, useEffect, useState } from "react";

import { useFormikContext } from "formik";

import { Box, Stack, Typography } from "@mui/material";

import { useFlags } from "launchdarkly-react-client-sdk";

import { Button } from "@newm-web/elements";

import { TrackDistributeFormValues } from "./types";

import PriceSummaryDialog from "./dialogs/PriceSummaryDialog";
import OrderSummaryDialog from "./dialogs/OrderSummaryDialog";
import { ConfirmContract } from "../../../../../components";

interface ConfirmAgreementProps {
  readonly shouldShowPriceSummary?: boolean;
}

const ConfirmAgreement: FunctionComponent<ConfirmAgreementProps> = ({
  shouldShowPriceSummary = true,
}) => {
  const [isPaymentSummaryOpen, setIsPaymentSummaryOpen] = useState(false);

  const { webStudioReleaseDistributionPaymentEnhancements } = useFlags();

  const { values, setFieldValue, isSubmitting } =
    useFormikContext<TrackDistributeFormValues>();

  const handleConsentToContract = (value: boolean) => {
    setFieldValue("consentsToContract", value);
  };

  const handleButtonClick = () => {
    if (shouldShowPriceSummary) {
      setIsPaymentSummaryOpen(!isPaymentSummaryOpen);
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
      <Stack spacing={ 1.5 }>
        <Typography variant="h4">CONTRACT &amp; TERMS OF SERVICE</Typography>
      </Stack>

      <ConfirmContract
        songTitle={ values.title }
        onConfirm={ handleConsentToContract }
      />

      <Box mt={ 3 }>
        <Button
          disabled={ !values.consentsToContract }
          isLoading={ isSubmitting }
          type={ shouldShowPriceSummary ? "button" : "submit" }
          width="compact"
          onClick={ handleButtonClick }
        >
          { shouldShowPriceSummary ? "Proceed to checkout" : "Resubmit release" }
        </Button>

        { shouldShowPriceSummary &&
          (webStudioReleaseDistributionPaymentEnhancements ? (
            <OrderSummaryDialog
              open={ isPaymentSummaryOpen }
              onClose={ () => setIsPaymentSummaryOpen(false) }
            />
          ) : (
            <PriceSummaryDialog
              open={ isPaymentSummaryOpen }
              onClose={ () => setIsPaymentSummaryOpen(false) }
            />
          )) }
      </Box>
    </Box>
  );
};

export default ConfirmAgreement;
