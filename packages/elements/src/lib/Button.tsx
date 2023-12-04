import { ForwardRefRenderFunction, forwardRef } from "react";
import {
  CircularProgress,
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
  Theme,
} from "@mui/material";
import theme from "@newm-web/theme";

export interface CommonProps extends Omit<MUIButtonProps, "color" | "variant"> {
  readonly isLoading?: boolean;
  readonly width?: "compact" | "default" | "full" | "icon";
  readonly target?: string;
  readonly href?: string;
}

type ConditionalProps =
  | {
      readonly variant?: never;
      readonly gradient?: keyof Theme["gradients"];
      readonly color?: never;
    }
  | {
      readonly variant?: "primary";
      readonly gradient?: keyof Theme["gradients"];
      readonly color?: never;
    }
  | {
      readonly variant?: "secondary" | "outlined";
      readonly color?: keyof Theme["colors"];
      readonly gradient?: never;
    };

export type ButtonProps = CommonProps & ConditionalProps;

/**
 * Implements Material UI Button.
 * See https://mui.com/material-ui/api/button/ for extra props.
 * Native `button` and `a` element attributes are also available to use.
 */
const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  {
    children,
    color = "white",
    gradient = "music",
    disabled = false,
    isLoading = false,
    variant = "primary",
    width = "default",
    sx,
    ...rest
  },
  ref
) => {
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
      minWidth: "40px",
      p: 0,
      width: "40px",
    },
  };

  const variantStyles = {
    primary: {
      background: theme.gradients[gradient],
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
        background: theme.colors.activeBackground,
      },
    },
  };

  return (
    <MUIButton
      disabled={ isLoading || disabled }
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
        ...sx,
      } }
      { ...rest }
      ref={ ref }
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

export default forwardRef(Button);
