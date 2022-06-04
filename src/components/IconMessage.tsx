import { FunctionComponent } from "react";
import { Stack } from "@mui/material";
import { Typography } from "elements";

interface IconMessageProps {
  readonly icon: JSX.Element;
  readonly message: string;
}

/**
 * Displays a vertically stacked icon and message.
 */
const IconMessage: FunctionComponent<IconMessageProps> = ({
  icon,
  message,
}) => (
  <Stack
    spacing={ 1 }
    direction="column"
    sx={ { flexGrow: 1, justifyContent: "center", alignItems: "center" } }
  >
    { icon }

    <Typography variant="h5" textAlign="center" fontWeight="regular">
      { message }
    </Typography>
  </Stack>
);

export default IconMessage;
