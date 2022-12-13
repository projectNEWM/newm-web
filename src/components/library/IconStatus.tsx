import { FunctionComponent } from "react";
import { Stack } from "@mui/material";
import { Typography } from "elements";

interface IconStatusProps {
  readonly icon: JSX.Element;
  readonly iconColor: string;
  readonly status: string | undefined;
}

/**
 * Displays a vertically stacked icon and message.
 */
const IconStatus: FunctionComponent<IconStatusProps> = ({
  icon,
  iconColor,
  status,
}) => (
  <Stack
    spacing={ 1 }
    direction="row"
    color={ iconColor }
    sx={ { justifyContent: "center", alignItems: "center" } }
  >
    { icon }

    <Typography
      color="grey100"
      variant="body2"
      sx={ { display: { xs: "block" } } }
    >
      { status }
    </Typography>
  </Stack>
);

export default IconStatus;
