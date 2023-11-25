import { FunctionComponent } from "react";
import NEWMLogo from "@newm.io/studio/assets/images/NEWMLogo";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";

const ResponsiveNEWMLogo: FunctionComponent = () => {
  const theme = useTheme();
  const isBelowMediumBreakpoint = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <NEWMLogo height={ isBelowMediumBreakpoint ? "50" : undefined } width={ isBelowMediumBreakpoint ? "50" : undefined } />
  );
};

export default ResponsiveNEWMLogo;
