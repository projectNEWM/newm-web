import { AlertTitle, Stack, Typography } from "@mui/material";
import { Alert, HorizontalLine } from "@newm-web/elements";
import theme from "@newm-web/theme";

const SaleEndPending = () => (
  <Stack sx={ { gap: 2.5, mt: 1 } }>
    <Alert>
      <AlertTitle color={ theme.colors.blue } sx={ { fontWeight: 600 } }>
        You have a stream token sale for this track that is pending
        cancellation!
      </AlertTitle>
      <Typography
        color={ theme.colors.blue }
        fontWeight={ 500 }
        variant="subtitle1"
      >
        Your sale is now being removed from the Marketplace.
      </Typography>
    </Alert>
    <Typography mt={ 2.5 } variant="subtitle2">
      Stream token sales may take several minutes to be removed from the
      Marketplace. You will receive an email notification once the sale has been
      successfully canceled. Once the cancellation is finalized, you can create
      a new stream token sale for this track.
    </Typography>
    <HorizontalLine />
  </Stack>
);

export default SaleEndPending;
