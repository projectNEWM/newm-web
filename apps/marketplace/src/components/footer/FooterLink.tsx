import { Link, Typography } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

interface FooterLinkProps {
  readonly children: ReactNode;
  readonly href: string;
}

const FooterLink: FunctionComponent<FooterLinkProps> = ({ children, href }) => {
  return (
    <Typography
      component="div"
      sx={ {
        fontSize: "16px",
        fontWeight: 600,
        lineHeight: "23px",
      } }
      variant="subtitle1"
    >
      <Link href={ href } rel="noopener" target="_blank">
        { children }
      </Link>
    </Typography>
  );
};

export default FooterLink;
