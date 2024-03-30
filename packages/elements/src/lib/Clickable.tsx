import { Box, BoxProps, useTheme } from "@mui/material";
import {
  ForwardRefRenderFunction,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  ReactNode,
  forwardRef,
} from "react";

interface ClickableProps extends BoxProps {
  readonly children: ReactNode;
  readonly onClick?: (event: MouseEvent | KeyboardEvent) => void;
}

const Clickable: ForwardRefRenderFunction<HTMLDivElement, ClickableProps> = (
  { onClick, children, sx, ...rest },
  ref
) => {
  const theme = useTheme();

  const handleKeyPress: KeyboardEventHandler = (event) => {
    if (event.key === "Enter") {
      onClick?.(event);
    }
  };

  return (
    <Box
      ref={ ref }
      role={ onClick ? "button" : undefined }
      sx={ {
        "&:hover": {
          backgroundColor: onClick ? "rgba(256, 256, 256, 0.05)" : "inherit",
        },
        borderRadius: theme.spacing(1),
        cursor: onClick ? "pointer" : "default",
        padding: theme.spacing(1.5),
        ...sx,
      } }
      tabIndex={ onClick ? 0 : undefined }
      onClick={ onClick }
      onKeyDown={ handleKeyPress }
      { ...rest }
    >
      { children }
    </Box>
  );
};

export default forwardRef(Clickable);
