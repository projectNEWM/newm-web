import {
  TypographyProps as MuiTypogaphyProps,
  Typography as MuiTypography,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { FunctionComponent } from "react";

export interface TypographyProps extends MuiTypogaphyProps {
  color?: keyof Theme["colors"];
}

/**
 * Typography component that allows for easily
 * overriding the color styling.
 */
const Typography: FunctionComponent<TypographyProps> = ({
  color,
  children,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <MuiTypography color={color ? theme.colors[color] : undefined} {...rest}>
      {children}
    </MuiTypography>
  );
};

export default Typography;
