import { Stack } from "@mui/material";
import { GradientCircularProgress, Typography } from "elements";
import { FunctionComponent } from "react";

interface TransactionPendingProps {
  readonly title: string;
  readonly message: string;
}

const TransactionPending: FunctionComponent<TransactionPendingProps> = ({
  title,
  message,
}) => {
  return (
    <Stack direction="row" spacing={ 2 } alignItems="center">
      <GradientCircularProgress startColor="pink" endColor="purple" />

      <Stack direction="column" spacing={ 1 }>
        <Typography>{ title }</Typography>
        <Typography variant="subtitle2">{ message }</Typography>
      </Stack>
    </Stack>
  );
};

export default TransactionPending;
