import { useFormikContext } from "formik";
import { Box, useTheme } from "@mui/material";
import { useWindowDimensions } from "@newm-web/utils";
import { Button, Typography } from "@newm-web/elements";
import { UploadSongRequest } from "../../../modules/song";
import { FunctionComponent, useState } from "react";
import { ConfirmContract } from "../../../components";
import PriceSummaryDialog from "./PriceSummaryDialog";

const ConfirmAgreement: FunctionComponent = () => {
  const theme = useTheme();
  const [isPaymentSummaryOpen, setIsPaymentSummaryOpen] = useState(false);

  const { values, setFieldValue, isSubmitting } =
    useFormikContext<UploadSongRequest>();

  const windowWidth = useWindowDimensions()?.width;

  const handleConsentToContract = (value: boolean) => {
    setFieldValue("consentsToContract", value);
  };

  return (
    <Box maxWidth={"500px"} marginX={["auto", "auto", "unset"]}>
      <Typography mb={1.5}>
        You&apos;re almost ready. Please review your ownership contract.
      </Typography>

      <ConfirmContract
        songTitle={values.title}
        isCoCreator={values.owners.length > 1}
        onConfirm={handleConsentToContract}
      />

      <Box mt={6}>
        <Button
          isLoading={isSubmitting}
          disabled={!values.consentsToContract}
          onClick={() => setIsPaymentSummaryOpen(!isPaymentSummaryOpen)}
          width={
            windowWidth && windowWidth > theme.breakpoints.values.md
              ? "compact"
              : "default"
          }
        >
          Distribute & Mint
        </Button>

        <PriceSummaryDialog
          open={isPaymentSummaryOpen}
          onClose={() => {
            setIsPaymentSummaryOpen(false);
          }}
        />
      </Box>
    </Box>
  );
};

export default ConfirmAgreement;
