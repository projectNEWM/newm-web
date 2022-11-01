import { FunctionComponent } from "react";
import {
  CircularProgress,
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
} from "@mui/material";
import theme from "theme";

interface ButtonProps extends Omit<MUIButtonProps, "color" | "variant"> {
  readonly color?:
    | "company"
    | "crypto"
    | "magazine"
    | "music"
    | "partners"
    | "white";
  readonly isLoading?: boolean;
  readonly variant?: "primary" | "secondary" | "outlined";
  readonly width?: "compact" | "default" | "full" | "icon";
}

/**
 * Implements Material UI Button.
 * See https://mui.com/material-ui/api/button/ for extra props.
 * Native `button` and `a` element attributes are also available to use.
 */
const Button: FunctionComponent<ButtonProps> = ({
  children,
  color = "music",
  disabled = false,
  isLoading = false,
  variant = "primary",
  width = "default",
  ...rest
}) => {
  const widthStyles = {
    compact: {
      maxWidth: "max-content",
    },
    default: {
      width: "100%",
      maxWidth: "340px",
    },
    full: {
      width: "100%",
    },
    icon: {
      height: "40px",
      minWidth: "unset",
      p: 0,
      width: "40px",
    },
  };

  const variantStyles = {
    primary: {
      background:
        color === "white" ? theme.gradients.music : theme.gradients[color],
      color: theme.colors.white,
      px: 2.25,
      py: 1.25,
      "&.Mui-disabled": {
        color: theme.colors.white,
      },
    },
    secondary: {
      backgroundColor: theme.colors.black,
      border: `2px solid ${theme.colors.grey500}`,
      "&:hover": {
        backgroundColor: theme.colors.black,
        borderColor: theme.colors.grey300,
      },
    },
    outlined: {
      border: `2px solid ${theme.colors[color]}`,
      "&:hover": {
        background: "rgba(255, 255, 255, 0.1)",
      },
    },
  };

  return (
    <MUIButton
      disabled={ disabled }
      sx={ {
        color: theme.colors[color],
        fontWeight: theme.typography.fontWeightSemiBold,
        height: "max-content",
        lineHeight: "20px",
        minWidth: "100px",
        opacity: disabled ? 0.4 : undefined,
        overflow: "hidden",
        px: 2,
        py: 1,
        textTransform: "none",
        "&.Mui-disabled": {
          color: theme.colors[color],
        },
        ...widthStyles[width],
        ...variantStyles[variant],
      } }
      { ...rest }
    >
      { isLoading ? (
        <CircularProgress
          disableShrink
          size={ 20 }
          sx={ {
            color:
              variant === "primary" ? theme.colors.white : theme.colors[color],
          } }
        />
      ) : (
        children
      ) }
    </MUIButton>
  );
};

export default Button;
