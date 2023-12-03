import { FunctionComponent, MouseEventHandler } from "react";
import { Stack } from "@mui/material";
import Typography from "./Typography";
import ErrorMessage from "./styled/ErrorMessage";

interface IconMessageProps {
  readonly icon: JSX.Element;
  readonly message?: string;
  readonly subtitle?: string;
  readonly errorMessage?: string;
  readonly onClick?: MouseEventHandler;
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
    spacing={message || subtitle || errorMessage ? 1 : 0}
    direction="column"
    onClick={onClick}
    sx={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
  >
    {icon}

    <Stack>
      {!!message && (
        <Typography variant="h5" textAlign="center" fontWeight={400}>
          {message}
        </Typography>
      )}

      {!!subtitle && (
        <Typography variant="subtitle2" textAlign="center">
          {subtitle}
        </Typography>
      )}

      {!!errorMessage && (
        <ErrorMessage align="center">{errorMessage}</ErrorMessage>
      )}
    </Stack>
  </Stack>
);

export default IconMessage;
