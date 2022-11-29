import { FunctionComponent } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Stack } from "@mui/material";
import theme from "theme";

interface SideBarNavLinkProps {
  readonly label: string;
  readonly icon: JSX.Element;
  readonly to: string;
  readonly closeMenu?: VoidFunction;
}

const activeBackground = "rgba(255, 255, 255, 0.1)";

const SideBarNavLink: FunctionComponent<SideBarNavLinkProps> = ({
  label,
  icon,
  to,
  closeMenu,
}) => {
  const resolved = useResolvedPath(to);
  const match = useMatch(resolved.pathname);

  return (
    <Link
      key={ label }
      onClick={ closeMenu }
      to={ to }
      style={ {
        textDecoration: "none",
        minWidth: "100%",
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
          background: match ? activeBackground : "transparent",
          opacity: `${!match ? 0.5 : 1}`,
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
    </Link>
  );
};

export default SideBarNavLink;
