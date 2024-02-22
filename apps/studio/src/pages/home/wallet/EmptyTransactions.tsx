import { FunctionComponent } from "react";
import { Stack, Typography } from "@mui/material";
import { Document } from "@newm-web/assets";

export const EmptyTransactions: FunctionComponent = () => (
  <Stack alignItems="center" mt={ 17.5 } rowGap={ 1.5 }>
    <Document />
    <Typography fontWeight={ 700 } mt={ 0.5 } variant="h4">
      No transactions found
    </Typography>
    <Typography fontSize="14px" fontWeight={ 400 } variant="h4">
      All future transactions will be listed here
    </Typography>
  </Stack>
);
