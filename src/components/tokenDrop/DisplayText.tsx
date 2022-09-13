import { useTheme } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

interface DisplayTextProps {
  readonly children: ReactNode;
}

const DisplayText: FunctionComponent<DisplayTextProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <span
      style={ {
        fontSize: "30px",
        color: theme.colors.white,
        fontWeight: 700,
      } }
    >
      { children }
    </span>
  );
};

export default DisplayText;
