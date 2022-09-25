import { useMediaQuery, useTheme } from "@mui/material";
import { useWindowDimensions } from "common";
import { FunctionComponent, HTMLProps, ReactNode } from "react";

interface DisplayTextProps extends HTMLProps<HTMLDivElement> {
  readonly children: ReactNode;
}

const DisplayText: FunctionComponent<DisplayTextProps> = ({
  children,
  style = {},
  ...rest
}) => {
  const theme = useTheme();

  const fontSize = useMediaQuery(theme.breakpoints.down("sm")) ? 20 : 30;

  return (
    <span
      style={ {
        fontSize,
        color: theme.colors.white,
        fontWeight: 700,
        ...style,
      } }
      { ...rest }
    >
      { children }
    </span>
  );
};

export default DisplayText;
