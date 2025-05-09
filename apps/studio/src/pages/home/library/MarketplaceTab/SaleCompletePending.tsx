import { AlertTitle, Stack, Typography } from "@mui/material";
import { Alert, HorizontalLine } from "@newm-web/elements";
import theme from "@newm-web/theme";

const SaleCompletePending = () => (
  <Stack sx={ { gap: 2.5, mt: 1 } }>
    <Alert>
      <AlertTitle color={ theme.colors.blue } sx={ { fontWeight: 600 } }>
        You have a token sale that is in the progress of being ended.
      </AlertTitle>
      <Typography
        color={ theme.colors.blue }
        fontWeight={ 500 }
        variant="subtitle1"
      >
        Your NEWM is being transferred to your wallet.
      </Typography>
    </Alert>
    <Typography mt={ 2.5 } variant="subtitle2">
      Stream token sales may take several minutes to be finalized. You will
      receive an email notification once the NEWM has been deposited into your
      wallet.
    </Typography>
    <HorizontalLine />
  </Stack>
);

export default SaleCompletePending;
