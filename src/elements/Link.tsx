import { ForwardRefRenderFunction, forwardRef } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import Typography, { TypographyProps } from "./Typography";

type DefaultProps = RouterLinkProps & TypographyProps;
interface LinkProps extends DefaultProps {
  readonly underline?: boolean;
}

const Link: ForwardRefRenderFunction<HTMLElement, LinkProps> = (
  { to, replace, color = "white", sx, underline = true, ...typographyProps },
  ref
) => {
  return (
    <RouterLink
      to={ to }
      replace={ replace }
      style={ { textDecoration: underline ? "underline" : "none" } }
    >
      <Typography
        { ...typographyProps }
        ref={ ref }
        color={ color }
        sx={ {
          textDecoration: underline ? "underline" : "none",
          ...sx,
        } }
      />
    </RouterLink>
  );
};

export default forwardRef(Link);
