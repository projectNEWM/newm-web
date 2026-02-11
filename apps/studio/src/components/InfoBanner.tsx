import { FunctionComponent } from "react";

import { useFlags } from "launchdarkly-react-client-sdk";

import { useTheme } from "@mui/material";

import { Banner } from "@newm-web/components";

import OfficialStatementCTA from "./OfficialStatementCTA";
import { useBreakpoint } from "../common";

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
      title={ <OfficialStatementCTA /> }
      titleSx={ { fontWeight: 100 } }
      fullWidth
    />
  );
};

export default InfoBanner;
