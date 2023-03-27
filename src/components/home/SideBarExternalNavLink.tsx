import { FunctionComponent } from "react";
import { Stack } from "@mui/material";
import theme from "theme";

const activeBackground = "rgba(255, 255, 255, 0.1)";

interface SideBarExternalNavLinkProps {
  readonly label: string;
  readonly icon: JSX.Element;
  readonly href: string;
  readonly onClick?: VoidFunction;
}

const SideBarExternalNavLink: FunctionComponent<
  SideBarExternalNavLinkProps
> = ({ label, icon, href, onClick }) => {
  return (
    <a
      href={ href }
      target="_blank"
      onClick={ onClick }
      style={ {
        textDecoration: "none",
        minWidth: "100%",
        cursor: "pointer",
      } }
      rel="noreferrer"
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
          background: "transparent",
          opacity: ".5",
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
    </a>
  );
};

export default SideBarExternalNavLink;
