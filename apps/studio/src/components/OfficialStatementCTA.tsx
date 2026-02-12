import { FunctionComponent, ReactNode } from "react";

import { Link, useTheme } from "@mui/material";

import { NEWM_IO_URL } from "../common";

const ANNOUNCEMENT_URL = `${NEWM_IO_URL}sunset/`;

interface OfficialStatementCTAProps {
  readonly children?: ReactNode;
  readonly href?: string;
  readonly linkText?: string;
}

const OfficialStatementCTA: FunctionComponent<OfficialStatementCTAProps> = ({
  href = ANNOUNCEMENT_URL,
  linkText = "official statement",
}) => {
  const theme = useTheme();

  return (
    <>
      NEWM Studio is stopping distribution services and Stream Token sales.
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
      &nbsp;for more information, key dates and instructions on how to migrate
      your catalog.
    </>
  );
};

export default OfficialStatementCTA;
