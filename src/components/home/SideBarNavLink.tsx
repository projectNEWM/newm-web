import { CSSProperties, FunctionComponent } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import theme from "theme";

const activeBackground = "rgba(255, 255, 255, 0.1)";

interface ButtonProps {
  readonly onClick?: VoidFunction;
  readonly style: CSSProperties;
}

interface LinkProps extends ButtonProps {
  readonly to: string;
}

type WrapperProps = LinkProps | ButtonProps;

interface SideBarNavLinkProps {
  readonly label: string;
  readonly icon: JSX.Element;
  readonly to?: string;
  readonly onClick?: VoidFunction;
}

const Wrapper: FunctionComponent<WrapperProps> = (props) => {
  if ("to" in props && props.to) {
    return <Link { ...props } />;
  } else {
    return <Box { ...props } />;
  }
};

const SideBarNavLink: FunctionComponent<SideBarNavLinkProps> = ({
  label,
  icon,
  to,
  onClick,
}) => {
  const resolved = useResolvedPath(to || "");
  const match = useMatch(resolved.pathname);
  const isActiveLink = to && match;

  return (
    <Wrapper
      onClick={ onClick }
      to={ to }
      style={ {
        textDecoration: "none",
        minWidth: "100%",
        cursor: "pointer",
      } }
    >
      <Stack
        direction="row"
        spacing={ 2.5 }
        sx={ {
          fontSize: "12px",
          lineHeight: "15px",
          fontWeight: 600,
          font: theme.typography.button.font,
          alignItems: "center",
          borderRadius: "6px",
          padding: "12px 20px",
          color: "white",
          background: isActiveLink ? activeBackground : "transparent",
          opacity: isActiveLink ? 1 : 0.5,
          transition: "background-color 0ms",
          display: "flex",
          textTransform: "none",
          justifyContent: "flex-start",
          "&:hover": {
            opacity: "1",
            background: `${activeBackground}`,
          },
        } }
        data-testid="navStyled"
      >
        { icon }
        <span>{ label }</span>
      </Stack>
    </Wrapper>
  );
};

export default SideBarNavLink;
