import { FunctionComponent } from "react";
import { Stack } from "@mui/material";
import { Typography } from "elements";

interface IconMessageProps {
  readonly icon: JSX.Element;
  readonly message: string;
  readonly subtitle?: string;
}

/**
 * Displays a vertically stacked icon and message.
 */
const IconMessage: FunctionComponent<IconMessageProps> = ({
  icon,
  message,
  subtitle,
}) => (
  <Stack
    spacing={ 1 }
    direction="column"
    sx={ { flexGrow: 1, justifyContent: "center", alignItems: "center" } }
  >
    { icon }

    <Stack>
      <Typography variant="h5" textAlign="center" fontWeight={ 400 }>
        { message }
      </Typography>

      { !!subtitle && (
        <Typography variant="subtitle2" textAlign="center">
          { subtitle }
        </Typography>
      ) }
    </Stack>
  </Stack>
);

export default IconMessage;
