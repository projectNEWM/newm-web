import { ForwardRefRenderFunction, forwardRef } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import Typography, { TypographyProps } from "./Typography";

type LinkProps = RouterLinkProps & TypographyProps;

const Link: ForwardRefRenderFunction<HTMLElement, LinkProps> = (
  { to, replace, color = "white", sx, ...typographyProps },
  ref
) => {
  return (
    <RouterLink replace={ replace } style={ { textDecoration: "none" } } to={ to }>
      <Typography
        { ...typographyProps }
        color={ color }
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
