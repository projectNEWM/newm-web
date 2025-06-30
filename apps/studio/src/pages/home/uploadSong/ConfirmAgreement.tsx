import { FunctionComponent, useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { Box, Typography, useTheme } from "@mui/material";
import { useWindowDimensions } from "@newm-web/utils";
import { Button } from "@newm-web/elements";
import { useFlags } from "launchdarkly-react-client-sdk";
import PriceSummaryDialog from "./PriceSummaryDialog";
import ReleaseSummaryDialog from "./ReleaseSummaryDialog";
import { UploadSongThunkRequest } from "../../../modules/song";
import { ConfirmContract } from "../../../components";

interface ConfirmAgreementProps {
  readonly shouldShowPriceSummary?: boolean;
}

const ConfirmAgreement: FunctionComponent<ConfirmAgreementProps> = ({
  shouldShowPriceSummary = true,
}) => {
  const theme = useTheme();
  const [isPaymentSummaryOpen, setIsPaymentSummaryOpen] = useState(false);

  const { webStudioReleaseDistributionPaymentEnhancements } = useFlags();

  const { values, setFieldValue, isSubmitting } =
    useFormikContext<UploadSongThunkRequest>();

  const windowWidth = useWindowDimensions()?.width;

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
      <Typography mb={ 1.5 }>
        You&apos;re almost ready. Please ensure all necessary track details have
        been updated and review your ownership contract.
      </Typography>

      <ConfirmContract
        isCoCreator={ values.owners.length > 1 }
        songTitle={ values.title }
        onConfirm={ handleConsentToContract }
      />

      <Box mt={ 6 }>
        <Button
          disabled={ !values.consentsToContract }
          isLoading={ isSubmitting }
          type={ shouldShowPriceSummary ? "button" : "submit" }
          width={
            windowWidth && windowWidth > theme.breakpoints.values.md
              ? "compact"
              : "default"
          }
          onClick={ handleButtonClick }
        >
          Distribute & Mint
        </Button>

        { shouldShowPriceSummary &&
          (webStudioReleaseDistributionPaymentEnhancements ? (
            <ReleaseSummaryDialog
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
