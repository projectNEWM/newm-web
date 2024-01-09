import { ForwardRefRenderFunction, forwardRef } from "react";
import {
  CircularProgress,
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
  Theme,
} from "@mui/material";
import theme from "@newm-web/theme";

export interface CommonProps extends Omit<MUIButtonProps, "color" | "variant"> {
  readonly href?: string;
  readonly isLoading?: boolean;
  readonly target?: string;
  readonly width?: "compact" | "default" | "full" | "icon";
}

type ConditionalProps =
  | {
      readonly color?: never;
      readonly gradient?: keyof Theme["gradients"];
      readonly variant?: never;
    }
  | {
      readonly color?: never;
      readonly gradient?: keyof Theme["gradients"];
      readonly variant?: "primary";
    }
  | {
      readonly color?: keyof Theme["colors"];
      readonly gradient?: never;
      readonly variant?: "secondary" | "outlined";
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
      maxWidth: "340px",
      width: "100%",
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
    outlined: {
      "&:hover": {
        background: theme.colors.activeBackground,
      },
      border: `2px solid ${theme.colors[color]}`,
    },
    primary: {
      "&.Mui-disabled": {
        color: theme.colors.white,
      },
      background: theme.gradients[gradient],
      color: theme.colors.white,
      px: 2.25,
      py: 1.25,
    },
    secondary: {
      "&:hover": {
        backgroundColor: theme.colors.black,
        borderColor: theme.colors.grey300,
      },
      backgroundColor: theme.colors.black,
      border: `2px solid ${theme.colors.grey500}`,
    },
  };

  return (
    <MUIButton
      disabled={ isLoading || disabled }
      sx={ {
        "&.Mui-disabled": {
          color: theme.colors[color],
        },
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
        ...widthStyles[width],
        ...variantStyles[variant],
        ...sx,
      } }
      { ...rest }
      ref={ ref }
    >
      { isLoading ? (
        <CircularProgress
          size={ 20 }
          sx={ {
            color:
              variant === "primary" ? theme.colors.white : theme.colors[color],
          } }
          disableShrink
        />
      ) : (
        children
      ) }
    </MUIButton>
  );
};

export default forwardRef(Button);
