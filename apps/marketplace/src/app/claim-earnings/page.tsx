"use client";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import {
  EARNINGS_IN_PROGRESS_UPDATED_EVENT,
  LOCAL_STORAGE_EARNINGS_IN_PROGRESS_KEY,
  TRANSACTION_FEE_IN_ADA,
  convertAdaToUsd,
  convertNewmiesToNewm,
  convertNewmiesToUsd,
} from "@newm-web/utils";
import {
  EarningsClaimInProgress,
  NoConnectedWallet,
  NoPendingEarnings,
  UnclaimedEarnings,
} from "@newm-web/components";
import { EarningsInProgress } from "@newm-web/types";
import { useAppDispatch, useAppSelector } from "../../common";
import { setIsConnectWalletModalOpen } from "../../modules/ui";
import {
  selectWallet,
  useClaimEarningsThunk,
  useGetAdaUsdConversionRateQuery,
  useGetEarningsQuery,
  useGetNewmUsdConversionRateQuery,
} from "../../modules/wallet";

const Home: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { wallet } = useConnectWallet();
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
  const { data: { usdPrice: adaUsdConversionRate = 0 } = {} } =
    useGetAdaUsdConversionRateQuery();
  const [claimEarnings, { isLoading: isClaimEarningsLoading }] =
    useClaimEarningsThunk();

  const [earningsInProgress, setEarningsInProgress] =
    useState<EarningsInProgress>();

  const preConvertedUsdPrice = newmUsdConversionRate?.usdPrice ?? 0;
  const { earnings = [], amountCborHex = "" } = earningsData || {};

  const unclaimedEarnings =
    earnings?.filter((earning) => !earning.claimed) || [];

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

  const totalClaimed = earningsData?.totalClaimed ?? 0;
  const totalClaimedInNEWM = convertNewmiesToNewm(totalClaimed);
  const totalClaimedInUSD = convertNewmiesToUsd(
    totalClaimed,
    preConvertedUsdPrice
  );

  const transactionFeeInUSD = convertAdaToUsd(
    TRANSACTION_FEE_IN_ADA,
    adaUsdConversionRate
  );
  const isEarningsInProgress =
    earningsInProgress?.unclaimedEarningsInNEWM ||
    earningsInProgress?.unclaimedEarningsInUSD;

  const handleSaleEndPending = useCallback(() => {
    const pendingSales = localStorage.getItem(
      LOCAL_STORAGE_EARNINGS_IN_PROGRESS_KEY
    );
    if (pendingSales) {
      const parsedPendingSales = JSON.parse(pendingSales);
      setEarningsInProgress(parsedPendingSales);
    } else {
      setEarningsInProgress(undefined);
    }
  }, []);

  useEffect(() => {
    handleSaleEndPending();

    window.addEventListener(
      EARNINGS_IN_PROGRESS_UPDATED_EVENT,
      handleSaleEndPending
    );

    return () => {
      window.removeEventListener(
        EARNINGS_IN_PROGRESS_UPDATED_EVENT,
        handleSaleEndPending
      );
    };
  }, [handleSaleEndPending]);

  const handleClaimEarnings = async () => {
    await claimEarnings({
      amountCborHex,
      unclaimedEarningsInNEWM,
      unclaimedEarningsInUSD,
    });
  };

  if (
    !wallet &&
    !(isConversionLoading || isEarningsLoading || isClaimEarningsLoading)
  ) {
    return (
      <Container sx={ { flex: 1 } }>
        <NoConnectedWallet
          onConnectWallet={ () => dispatch(setIsConnectWalletModalOpen(true)) }
        />
      </Container>
    );
  }

  return (
    <>
      <Typography
        component="h1"
        fontSize={ ["24px", "24px", "32px"] }
        mt={ 10 }
        textAlign="center"
        variant="h3"
      >
        Claim Earnings
      </Typography>

      <Container
        sx={ { alignContent: "center", flex: 1, justifyItems: "center" } }
      >
        <Stack>
          { unclaimedEarnings?.length ? (
            isEarningsInProgress ? (
              <EarningsClaimInProgress
                unclaimedEarningsInNEWM={ unclaimedEarningsInNEWM }
                unclaimedEarningsInUSD={ unclaimedEarningsInUSD }
              />
            ) : (
              <UnclaimedEarnings
                isClaimEarningsLoading={ isClaimEarningsLoading }
                isConversionLoading={ isConversionLoading }
                isEarningsError={ isEarningsError }
                isEarningsLoading={ isEarningsLoading }
                transactionFeeInADA={ TRANSACTION_FEE_IN_ADA }
                transactionFeeInUSD={ transactionFeeInUSD }
                unclaimedEarningsInNEWM={ unclaimedEarningsInNEWM }
                unclaimedEarningsInUSD={ unclaimedEarningsInUSD }
                onClaimEarnings={ handleClaimEarnings }
              />
            )
          ) : (
            <NoPendingEarnings
              isConversionError={ isConversionError }
              isConversionLoading={ isConversionLoading }
              isEarningsError={ isEarningsError }
              isEarningsLoading={ isEarningsLoading }
              totalClaimedInNEWM={ totalClaimedInNEWM }
              totalClaimedInUSD={ totalClaimedInUSD }
            />
          ) }
        </Stack>
      </Container>
    </>
  );
};

export default Home;
