import { FunctionComponent, useCallback, useEffect, useState } from "react";
import {
  EARNINGS_IN_PROGRESS_UPDATED_EVENT,
  FIFTEEN_SECONDS_IN_MILLISECONDS,
  FIVE_MINUTES_IN_MILLISECONDS,
  LOCAL_STORAGE_EARNINGS_IN_PROGRESS_KEY,
} from "@newm-web/utils";
import { GetEarningsResponse } from "@newm-web/types";

interface PingEarningsInProgressProps {
  getEarningsQuery: any; // This is the useGetEarningsQuery
  walletAddress: string;
}

const PingEarningsInProgress: FunctionComponent<
  PingEarningsInProgressProps
> = ({ walletAddress = "", getEarningsQuery }) => {
  const [currentPollingInterval, setPollingInterval] = useState<number>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const {
    data: earningsData,
    isLoading: isEarningsLoading,
    isSuccess: isGetEarningsSuccess,
  } = getEarningsQuery(walletAddress, {
    pollingInterval: currentPollingInterval,
    skip: !walletAddress,
  }) as {
    data: GetEarningsResponse | undefined;
    isLoading: boolean;
    isSuccess: boolean;
  };

  const handleEarningsInProgress = useCallback(() => {
    const earningsInProgress = localStorage.getItem(
      LOCAL_STORAGE_EARNINGS_IN_PROGRESS_KEY
    );
    if (earningsInProgress && !isEarningsLoading) {
      setPollingInterval(FIFTEEN_SECONDS_IN_MILLISECONDS);
    } else {
      setPollingInterval(undefined);
    }
  }, [isEarningsLoading]);

  /**
   * Initialize and manage the event listener for pending earning updates.
   * It also calls handleEarningsInProgress to initialize the state based on localStorage.
   */
  useEffect(() => {
    handleEarningsInProgress();
    window.addEventListener(
      EARNINGS_IN_PROGRESS_UPDATED_EVENT,
      handleEarningsInProgress
    );

    return () => {
      window.removeEventListener(
        EARNINGS_IN_PROGRESS_UPDATED_EVENT,
        handleEarningsInProgress
      );

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleEarningsInProgress]);

  /**
   * Reset the 5-minute timeout whenever the earningsInProgress state changes.
   */
  useEffect(() => {
    const earningsInProgress = localStorage.getItem(
      LOCAL_STORAGE_EARNINGS_IN_PROGRESS_KEY
    );

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (earningsInProgress) {
      const newTimeoutId = setTimeout(() => {
        setPollingInterval(undefined);
      }, FIVE_MINUTES_IN_MILLISECONDS);

      setTimeoutId(newTimeoutId);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Update localStorage whenever all earnings have been claimed.
   */
  useEffect(() => {
    const earnings = earningsData?.earnings ?? [];
    const unclaimedEarnings = earnings.filter((earning) => !earning.claimed);
    if (isGetEarningsSuccess && !unclaimedEarnings.length) {
      localStorage.removeItem(LOCAL_STORAGE_EARNINGS_IN_PROGRESS_KEY);

      window.dispatchEvent(new Event(EARNINGS_IN_PROGRESS_UPDATED_EVENT));
      return;
    }
  }, [earningsData?.earnings, isGetEarningsSuccess]);

  return null;
};

export default PingEarningsInProgress;
