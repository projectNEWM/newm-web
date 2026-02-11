import { FunctionComponent, ReactNode } from "react";

import { Link, useTheme } from "@mui/material";

import { NEWM_IO_URL } from "../common";

interface OfficialStatementCTAProps {
  readonly children?: ReactNode;
  readonly href?: string;
  readonly linkText?: string;
}

const OfficialStatementCTA: FunctionComponent<OfficialStatementCTAProps> = ({
  href = NEWM_IO_URL,
  linkText = "official statement",
}) => {
  const theme = useTheme();

  return (
    <>
      NEWM Studio distribution and Stream Token sales have been discontinued.
      Please read our team&apos;s&nbsp;
      <Link
        href={ href }
        rel="noopener noreferrer"
        sx={ {
          color: theme.colors.white,
          fontWeight: 600,
          textDecoration: "underline",
        } }
        target="_blank"
      >
        { linkText }
      </Link>
      &nbsp;for next steps regarding your releases.
    </>
  );
};

export default OfficialStatementCTA;
