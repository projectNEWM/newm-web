import { FunctionComponent } from "react";
import { Skeleton, Stack, Typography } from "@mui/material";
import { CheckCircle } from "@newm-web/assets";
import theme from "@newm-web/theme";
import {
  convertNewmiesToNewm,
  convertNewmiesToUsd,
  formatNewmAmount,
  formatUsdAmount,
} from "@newm-web/utils";
import { useGetNewmUsdConversionRateQuery } from "../../../modules/crypto";
import { selectWallet, useGetEarningsQuery } from "../../../modules/wallet";
import { useAppSelector } from "../../../common";

export const NoPendingEarnings: FunctionComponent = () => {
  const { walletAddress = "" } = useAppSelector(selectWallet);
  const {
    data: earningsData,
    isLoading: isEarningsLoading,
    isError: isEarningsError,
  } = useGetEarningsQuery(walletAddress, {
    skip: !walletAddress,
  });
  const {
    data: newmUsdConversionRate,
    isLoading: isConversionLoading,
    isError: isConversionError,
  } = useGetNewmUsdConversionRateQuery();
  const preConvertedUsdPrice = newmUsdConversionRate?.usdPrice ?? 0;
  const totalClaimed = earningsData?.totalClaimed ?? 0;
  const totalClaimedInNEWM = convertNewmiesToNewm(totalClaimed);
  const totalClaimedInUSD = convertNewmiesToUsd(
    totalClaimed,
    preConvertedUsdPrice
  );

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
