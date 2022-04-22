import { ForwardRefRenderFunction, forwardRef } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import Typography, { TypographyProps } from "./Typography";

type LinkProps = RouterLinkProps & TypographyProps;

const Link: ForwardRefRenderFunction<HTMLElement, LinkProps> = (
  { to, replace, ...typographyProps },
  ref
) => {
  return (
    <RouterLink to={ to } replace={ replace }>
      <Typography
        { ...typographyProps }
        ref={ ref }
        sx={ { textDecoration: "underline" } }
      />
    </RouterLink>
  );
};

export default forwardRef(Link);
