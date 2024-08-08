import { FunctionComponent } from "react";
import { Stack, Theme, Typography } from "@mui/material";
import theme from "@newm-web/theme";

export interface IconStatusProps {
  readonly fontColor?: keyof Theme["colors"];
  readonly icon: JSX.Element;
  readonly iconColor?: keyof Theme["colors"];
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
      alignItems: "center",
      color: theme.colors[iconColor],
      display: "flex",
      flexDirection: "row",
      gap: 1,
      justifyContent: "center",
    } }
  >
    { icon }

    <Typography color={ theme.colors[fontColor] } fontWeight={ 400 }>
      { status }
    </Typography>
  </Stack>
);

export default IconStatus;
