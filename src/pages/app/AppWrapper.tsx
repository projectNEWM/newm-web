/**
 * Wraps the app so that the content scrolls correctly.
 */

import { Box } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper: FunctionComponent<AppWrapperProps> = ({ children }) => {
  return (
    <Box
      sx={ {
        position: "fixed",
        width: "100%",
        height: window.innerHeight,
        overflow: "none",
      }}
    >
      <Box
        sx={ {
          width: "100%",
          height: window.innerHeight,
          overflow: "scroll",
        }}
      >
        { children }
      </Box>
    </Box>
  )
}

export default AppWrapper;
