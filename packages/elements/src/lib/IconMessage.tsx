import { FunctionComponent, MouseEventHandler } from "react";
import { Stack } from "@mui/material";
import Typography from "./Typography";
import ErrorMessage from "./styled/ErrorMessage";

interface IconMessageProps {
  readonly errorMessage?: string;
  readonly icon: JSX.Element;
  readonly message?: string;
  readonly onClick?: MouseEventHandler;
  readonly subtitle?: string;
}

/**
 * Displays a vertically stacked icon and message.
 */
const IconMessage: FunctionComponent<IconMessageProps> = ({
  icon,
  message,
  subtitle,
  errorMessage,
  onClick,
}) => (
  <Stack
    direction="column"
    spacing={ message || subtitle || errorMessage ? 1 : 0 }
    sx={ { alignItems: "center", flexGrow: 1, justifyContent: "center" } }
    onClick={ onClick }
  >
    { icon }

    <Stack>
      { !!message && (
        <Typography fontWeight={ 400 } textAlign="center" variant="h5">
          { message }
        </Typography>
      ) }

      { !!subtitle && (
        <Typography textAlign="center" variant="subtitle2">
          { subtitle }
        </Typography>
      ) }

      { !!errorMessage && (
        <ErrorMessage align="center">{ errorMessage }</ErrorMessage>
      ) }
    </Stack>
  </Stack>
);

export default IconMessage;
