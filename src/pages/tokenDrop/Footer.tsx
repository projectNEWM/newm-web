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
      label: "Terms of service",
      type: "router",
    },
    {
      to: "#",
      label: "Disclaimer",
      type: "router",
    },
    {
      to: "#",
      label: "FAQ",
      type: "web",
    },
    {
      to: "#",
      label: "Website",
      type: "web",
    },
    {
      to: "#",
      label: "Artist socials",
      type: "router",
    },
  ];

  return (
    <Box
      sx={ {
        py: 2.25,
        display: "flex",
        backgroundColor: theme.colors.black100,
        justifyContent: "space-around",
        alignItems: "center",
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
            href={ to }
            style={ {
              padding: "8px",
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
  );
};

export default Footer;
