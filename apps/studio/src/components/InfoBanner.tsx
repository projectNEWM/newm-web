import { FunctionComponent } from "react";

import { useFlags } from "launchdarkly-react-client-sdk";

import { Link, useTheme } from "@mui/material";

import { Banner } from "@newm-web/components";

import { NEWM_IO_URL, useBreakpoint } from "../common";

const InfoBanner: FunctionComponent = () => {
  const { webStudioDisableDistributionAndSales } = useFlags();

  const theme = useTheme();
  const { isDesktop } = useBreakpoint();

  if (!webStudioDisableDistributionAndSales) {
    return null;
  }

  return (
    <Banner
      background={ theme.gradients.company }
      fixed={ isDesktop }
      title={
        <>
          NEWM Studio distribution and Stream Token sales have been
          discontinued. Please read our team&apos;s&nbsp;
          <Link
            href={ NEWM_IO_URL }
            rel="noopener noreferrer"
            sx={ {
              color: theme.colors.white,
              fontWeight: 600,
              textDecoration: "underline",
            } }
            target="_blank"
          >
            official statement
          </Link>
          &nbsp;for next steps regarding your releases.
        </>
      }
      titleSx={ { fontWeight: 100 } }
      fullWidth
    />
  );
};

export default InfoBanner;
