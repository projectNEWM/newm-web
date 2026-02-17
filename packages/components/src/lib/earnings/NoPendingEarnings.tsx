import { FunctionComponent } from "react";
import { Skeleton, Stack, Typography } from "@mui/material";
import { CheckCircle } from "@newm-web/assets";
import theme from "@newm-web/theme";
import { formatNewmAmount, formatUsdAmount } from "@newm-web/utils";

interface NoPendingEarningsProps {
  readonly isConversionError: boolean;
  readonly isConversionLoading: boolean;
  readonly isEarningsError: boolean;
  readonly isEarningsLoading: boolean;
  readonly totalClaimedInNEWM: number;
  readonly totalClaimedInUSD: number;
}

const NoPendingEarnings: FunctionComponent<NoPendingEarningsProps> = ({
  totalClaimedInNEWM,
  totalClaimedInUSD,
  isEarningsLoading,
  isConversionLoading,
  isConversionError,
  isEarningsError,
}) => {
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
      { isEarningsLoading || isConversionLoading ? (
        <Stack>
          <Skeleton height={ 24 } width={ 240 } />
          <Skeleton height={ 24 } width={ 420 } />
        </Stack>
      ) : (
        <>
          <CheckCircle fill={ theme.colors.green } />
          <Stack>
            <Typography color={ theme.colors.green } fontWeight={ 500 }>
              No pending earnings to claim
            </Typography>
            { isConversionError || isEarningsError ? (
              <Typography fontWeight={ 500 }>
                Error fetching conversion rates
              </Typography>
            ) : (
              <Typography color={ theme.colors.grey200 } fontWeight={ 500 }>
                { `Total earnings accrued so far: ${formatNewmAmount(
                  totalClaimedInNEWM
                )} (~${formatUsdAmount(totalClaimedInUSD)})` }
              </Typography>
            ) }
          </Stack>
        </>
      ) }
    </Stack>
  );
};

export default NoPendingEarnings;
