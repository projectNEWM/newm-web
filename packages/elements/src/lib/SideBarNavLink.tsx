import { CSSProperties, FunctionComponent, ReactNode } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Box, Stack, SvgIconProps } from "@mui/material";
import theme from "@newm-web/theme";

interface ButtonProps {
  readonly children: ReactNode;
  readonly onClick?: VoidFunction;
  readonly style: CSSProperties;
}

interface LinkProps extends ButtonProps {
  readonly children: ReactNode;
  readonly to: string;
}

interface AnchorProps extends ButtonProps {
  readonly children: ReactNode;
  readonly href: string;
}

type WrapperProps = LinkProps | ButtonProps | AnchorProps;

interface SideBarNavLinkProps {
  readonly Icon: React.ComponentType<SvgIconProps>;
  readonly href?: string;
  readonly label: string;
  readonly onClick?: VoidFunction;
  readonly to?: string;
}

const Wrapper: FunctionComponent<WrapperProps> = ({ children, ...props }) => {
  if ("to" in props && props.to) {
    return <Link { ...props }>{ children }</Link>;
  } else if ("href" in props && props.href) {
    return (
      <a rel="noreferrer" target="_blank" { ...props }>
        { children }
      </a>
    );
  } else {
    return <Box { ...props }>{ children }</Box>;
  }
};

const SideBarNavLink: FunctionComponent<SideBarNavLinkProps> = ({
  label,
  Icon,
  to,
  href,
  onClick,
}) => {
  const resolved = useResolvedPath(to || "");
  const match = useMatch({ end: false, path: resolved.pathname });
  const isActiveLink = to && match;

  return (
    <Wrapper
      href={ href }
      style={ {
        cursor: "pointer",
        minWidth: "100%",
        textDecoration: "none",
      } }
      to={ to }
      onClick={ onClick }
    >
      <Stack
        data-testid="navStyled"
        direction="row"
        spacing={ 2 }
        sx={ {
          "&:hover": {
            background: theme.colors.activeBackground,
            opacity: "1",
          },
          alignItems: "center",
          background: isActiveLink
            ? theme.colors.activeBackground
            : "transparent",
          borderRadius: "6px",
          color: "white",
          display: "flex",
          font: theme.typography.button.font,
          fontSize: "12px",
          fontWeight: 600,
          justifyContent: "flex-start",
          lineHeight: "15px",
          opacity: isActiveLink ? 1 : 0.5,
          padding: "12px 20px",
          textTransform: "none",
          transition: "background-color 0ms",
        } }
      >
        <Icon sx={ { fontSize: "18px" } } />
        <span>{ label }</span>
      </Stack>
    </Wrapper>
  );
};

export default SideBarNavLink;
