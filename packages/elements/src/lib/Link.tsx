import { ForwardRefRenderFunction, forwardRef } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import {
  TypographyProps as MuiTypogaphyProps,
  Typography,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import theme from "@newm-web/theme";

interface TypographyProps extends MuiTypogaphyProps {
  color?: keyof Theme["colors"];
}

type LinkProps = RouterLinkProps & TypographyProps;

const Link: ForwardRefRenderFunction<HTMLElement, LinkProps> = (
  { to, replace, color = "white", sx, ...typographyProps },
  ref
) => {
  return (
    <RouterLink replace={ replace } style={ { textDecoration: "none" } } to={ to }>
      <Typography
        { ...typographyProps }
        color={ theme.colors[color] }
        ref={ ref }
        sx={ {
          textDecoration: "underline",
          ...sx,
        } }
      />
    </RouterLink>
  );
};

export default forwardRef(Link);
