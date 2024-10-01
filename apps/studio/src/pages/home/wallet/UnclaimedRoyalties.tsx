import { Box, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import { Button, Tooltip } from "@newm-web/elements";
import theme from "@newm-web/theme";
import HelpIcon from "@mui/icons-material/Help";
import {
  TRANSACTION_FEE_IN_ADA,
  convertAdaToUsd,
  convertNewmiesToNewm,
  convertNewmiesToUsd,
  formatNewmAmount,
  formatUsdAmount,
} from "@newm-web/utils";
import { useState } from "react";
import EarningsSummaryModal from "./EarningsSummaryModal";
import {
  selectWallet,
  useClaimEarningsThunk,
  useGetEarningsQuery,
} from "../../../modules/wallet";
import { useAppSelector } from "../../../common";
import {
  useGetAdaUsdConversionRateQuery,
  useGetNewmUsdConversionRateQuery,
} from "../../../modules/crypto";

export const UnclaimedRoyalties = () => {
  const [isEarningsSummaryModalOpen, setIsEarningsSummaryModalOpen] =
    useState(false);
  const { walletAddress = "" } = useAppSelector(selectWallet);
  const { data: newmUsdConversionRate, isLoading: isConversionLoading } =
    useGetNewmUsdConversionRateQuery();
  const { data: { usdPrice: adaUsdConversionRate = 0 } = {} } =
    useGetAdaUsdConversionRateQuery();
  const {
    data: earningsData,
    isLoading: isEarningsLoading,
    isError: isEarningsError,
  } = useGetEarningsQuery(walletAddress, {
    skip: !walletAddress,
  });
  const [claimEarnings, { isLoading: isClaimEarningsLoading }] =
    useClaimEarningsThunk();
  const preConvertedUsdPrice = newmUsdConversionRate?.usdPrice ?? 0;
  const { earnings = [], amountCborHex = "" } = earningsData || {};

  const unclaimedEarnings = earnings?.filter((earning) => !earning.claimed);
  const unclaimedEarningsInNewmies =
    unclaimedEarnings?.reduce(
      (sum, earning) => sum + (earning.amount || 0),
      0
    ) || 0;
  const unclaimedEarningsInNEWM = convertNewmiesToNewm(
    unclaimedEarningsInNewmies
  );
  const unclaimedEarningsInUSD = convertNewmiesToUsd(
    unclaimedEarningsInNewmies,
    preConvertedUsdPrice
  );
  const transactionFeeInUSD = convertAdaToUsd(
    TRANSACTION_FEE_IN_ADA,
    adaUsdConversionRate
  );

  const handleClaimEarnings = async () => {
    await claimEarnings({
      amountCborHex,
      unclaimedEarningsInNEWM,
      unclaimedEarningsInUSD,
    });

    setIsEarningsSummaryModalOpen(false);
  };

  return (
    <Box
      sx={ {
        backgroundColor: theme.colors.grey600,
        borderRadius: "8px",
        display: "flex",
        gap: 3,
        justifyContent: "space-between",
        minHeight: "100px",
        padding: 2.5,
        width: "max-content",
      } }
    >
      <Box
        sx={ {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingRight: [1, "unset"],
        } }
      >
        <Stack alignItems="center" direction="row" gap={ 1 } pb={ 1.5 }>
          <Typography
            color={ theme.colors.grey100 }
            fontSize={ 12 }
            fontWeight={ 500 }
          >
            YOU HAVE UNCLAIMED EARNINGS
          </Typography>

          <Tooltip
            title={
              "These earnings include the streaming royalties accumulated " +
              "for your distributed and minted songs. Select \"Claim now\" " +
              "to transfer unclaimed earnings to your wallet. Upon launch of " +
              "the NEWM Marketplace, any income generated through your " +
              "stream token sales will also be available to claim here."
            }
          >
            <IconButton sx={ { padding: 0 } }>
              <HelpIcon sx={ { color: theme.colors.grey100 } } />
            </IconButton>
          </Tooltip>
        </Stack>

        { isEarningsLoading || isConversionLoading ? (
          <Stack>
            <Skeleton height={ 36 } width={ 160 } />
            <Skeleton height={ 24 } width={ 80 } />
          </Stack>
        ) : (
          <>
            <Typography
              fontSize="24px"
              fontWeight={ 700 }
              lineHeight="28px"
              pb={ 0.5 }
            >
              { formatNewmAmount(unclaimedEarningsInNEWM) }
            </Typography>
            <Typography
              color={ theme.colors.grey200 }
              fontWeight={ 500 }
              variant="subtitle1"
            >
              ~{ formatUsdAmount(unclaimedEarningsInUSD) }
            </Typography>
          </>
        ) }
      </Box>
      <Box sx={ { alignSelf: "center" } }>
        <Button
          color="white"
          disabled={
            isEarningsLoading || isEarningsError || isClaimEarningsLoading
          }
          sx={ { alignSelf: "center" } }
          variant="outlined"
          width="compact"
          onClick={ () =>
            setIsEarningsSummaryModalOpen(!isEarningsSummaryModalOpen)
          }
        >
          Claim now
        </Button>
        <EarningsSummaryModal
          isLoading={ isClaimEarningsLoading }
          isOpen={ isEarningsSummaryModalOpen }
          transactionFeeInADA={ TRANSACTION_FEE_IN_ADA }
          transactionFeeInUSD={ transactionFeeInUSD }
          unclaimedEarningsInNEWM={ unclaimedEarningsInNEWM }
          unclaimedEarningsInUSD={ unclaimedEarningsInUSD }
          onClose={ () => setIsEarningsSummaryModalOpen(false) }
          onSubmit={ handleClaimEarnings }
        />
      </Box>
    </Box>
  );
};

export default UnclaimedRoyalties;
