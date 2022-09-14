import { Box, useTheme } from "@mui/material";
import { Link } from "elements";
import { FunctionComponent } from "react";

interface Links {
  readonly to: string;
  readonly label: string;
  readonly type: "router" | "web";
}

const Footer: FunctionComponent = () => {
  const theme = useTheme();

  const links: ReadonlyArray<Links> = [
    {
      to: "#",
      label: "Artist socials",
      type: "router",
    },
    {
      to: "#",
      label: "FAQ",
      type: "web",
    },
    {
      to: "#",
      label: "NEWM.io",
      type: "web",
    },
    {
      to: "#",
      label: "Disclaimer",
      type: "router",
    },
    {
      to: "#",
      label: "Terms of service",
      type: "router",
    },
  ];

  return (
    <Box
      display={ ["flex", "flex", "block"] }
      justifyContent={ ["center", "center", "space-between"] }
    >
      <Box
        sx={ {
          py: 2.25,
          display: "flex",
          flexDirection: ["column", "column", "row"],
          justifyContent: "space-around",
          alignItems: ["flex-start", "flex-start", "center"],
        } }
      >
        { links.map(({ to, label, type }) =>
          type === "router" ? (
            <Link
              key={ label }
              to={ to }
              sx={ { p: 0.5, fontWeight: 400 } }
              underline={ false }
            >
              { label }
            </Link>
          ) : (
            <a
              key={ label }
              href={ to }
              style={ {
                padding: "4px",
                textDecoration: "none",
                color: theme.colors.white,
                fontWeight: 400,
              } }
            >
              { label }
            </a>
          )
        ) }
      </Box>
    </Box>
  );
};

export default Footer;
