import { Box, BoxProps, useTheme } from "@mui/material";
import { FunctionComponent, KeyboardEventHandler, ReactNode } from "react";

interface ClickableProps extends BoxProps {
  readonly children: ReactNode;
  readonly onClick?: () => void;
}

const Clickable: FunctionComponent<ClickableProps> = ({
  onClick,
  children,
}) => {
  const theme = useTheme();

  const handleKeyPress: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.stopPropagation();
      onClick?.();
    }
  };

  return (
    <Box
      role={ onClick ? "button" : undefined }
      sx={ {
        "&:hover": {
          backgroundColor: onClick ? "rgba(256, 256, 256, 0.05)" : "inherit",
        },
        borderRadius: theme.spacing(1),
        cursor: onClick ? "pointer" : "default",
        padding: theme.spacing(1.5),
      } }
      tabIndex={ onClick ? 0 : undefined }
      onClick={ onClick }
      onKeyDown={ handleKeyPress }
    >
      { children }
    </Box>
  );
};

export default Clickable;
