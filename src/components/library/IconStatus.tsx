import { FunctionComponent } from "react";
import { Stack, Theme } from "@mui/material";
import { Typography } from "elements";
import theme from "theme";

export interface IconStatusProps {
  readonly icon: JSX.Element;
  readonly iconColor?: keyof Theme["colors"];
  readonly fontColor?: keyof Theme["colors"];
  readonly status: string | undefined;
}

/**
 * Displays a horizontal icon and message.
 */
const IconStatus: FunctionComponent<IconStatusProps> = ({
  icon,
  iconColor = "music",
  fontColor = "white",
  status,
}) => (
  <Stack
    sx={ {
      display: "flex",
      gap: 1,
      flexDirection: "row",
      color: theme.colors[iconColor],
      justifyContent: "center",
      alignItems: "center",
    } }
  >
    { icon }

    <Typography color={ fontColor }>{ status }</Typography>
  </Stack>
);

export default IconStatus;
