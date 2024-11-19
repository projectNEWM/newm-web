import { FunctionComponent } from "react";
import { Stack, Typography } from "@mui/material";
import theme from "@newm-web/theme";
import { formatNewmAmount, formatUsdAmount } from "@newm-web/utils";
import { InfoOutlined } from "@mui/icons-material";

interface EarningsClaimInProgressProps {
  readonly unclaimedEarningsInNEWM: number;
  readonly unclaimedEarningsInUSD: number;
}

const EarningsClaimInProgress: FunctionComponent<
  EarningsClaimInProgressProps
> = ({ unclaimedEarningsInNEWM, unclaimedEarningsInUSD }) => {
  return (
    <Stack
      sx={ {
        backgroundColor: theme.colors.grey600,
        borderRadius: "6px",
        flexDirection: "row",
        gap: 1.5,
        p: 2,
        width: "fit-content",
      } }
    >
      <InfoOutlined sx={ { color: theme.colors.baseBlue } } />
      <Stack>
        <Typography color={ theme.colors.baseBlue } fontWeight={ 500 }>
          Earnings claim in progress
        </Typography>
        <Typography color={ theme.colors.grey200 } fontWeight={ 500 }>
          { `Earnings in progress: ${formatNewmAmount(
            unclaimedEarningsInNEWM
          )} (~${formatUsdAmount(unclaimedEarningsInUSD)})` }
        </Typography>
      </Stack>
    </Stack>
  );
};

export default EarningsClaimInProgress;
