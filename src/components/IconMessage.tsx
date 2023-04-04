import { FunctionComponent } from "react";
import { Stack } from "@mui/material";
import { Typography } from "elements";
import ErrorMessage from "./styled/ErrorMessage";

interface IconMessageProps {
  readonly icon: JSX.Element;
  readonly message?: string;
  readonly subtitle1?: string;
  readonly subtitle2?: string;
  readonly errorMessage?: string;
}

/**
 * Displays a vertically stacked icon and message.
 */
const IconMessage: FunctionComponent<IconMessageProps> = ({
  icon,
  message,
  subtitle1,
  subtitle2,
  errorMessage,
}) => (
  <Stack
    spacing={ 1 }
    direction="column"
    sx={ { flexGrow: 1, justifyContent: "center", alignItems: "center" } }
  >
    { icon }

    <Stack>
      { !!message && (
        <Typography variant="h5" textAlign="center" fontWeight={ 400 }>
          { message }
        </Typography>
      ) }

      { !!subtitle1 && (
        <Typography variant="subtitle2" textAlign="center">
          { subtitle1 }
        </Typography>
      ) }

      { !!subtitle2 && (
        <Typography variant="subtitle2" textAlign="center">
          { subtitle2 }
        </Typography>
      ) }

      { !!errorMessage && (
        <ErrorMessage align="center">{ errorMessage }</ErrorMessage>
      ) }
    </Stack>
  </Stack>
);

export default IconMessage;
