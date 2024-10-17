import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { SaleStatus } from "@newm-web/types";
import { useGetSalesQuery } from "../../modules/sale";
import {
  FIFTEEN_SECONDS_IN_MILLISECONDS,
  FIVE_MINUTES_IN_MILLISECONDS,
  LOCAL_STORAGE_SALE_END_PENDING_KEY,
  SALE_END_UPDATED_EVENT,
} from "../../common";

const PingSaleEnd: FunctionComponent = () => {
  const [currentPollingInterval, setPollingInterval] = useState<number>();
  const [saleEndSongIds, setSaleEndSongIds] = useState<string[] | null>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const { data: sales = [], isLoading: isGetSalesLoading } = useGetSalesQuery(
    {
      saleStatuses: [SaleStatus.Started],
      songIds: saleEndSongIds || undefined,
    },
    {
      pollingInterval: currentPollingInterval,
      skip:
        saleEndSongIds === null ||
        (saleEndSongIds && saleEndSongIds.length === 0),
    }
  );

  const handleSaleEndPending = useCallback(() => {
    const pendingSales = localStorage.getItem(
      LOCAL_STORAGE_SALE_END_PENDING_KEY
    );

    if (pendingSales) {
      const parsedPendingSales = JSON.parse(pendingSales);

      setSaleEndSongIds(parsedPendingSales);
      setPollingInterval(FIFTEEN_SECONDS_IN_MILLISECONDS);
    } else {
      setSaleEndSongIds(null);
      setPollingInterval(undefined);
    }
  }, []);

  /**
   * Initialize and manage the event listener for pending sales updates.
   * It also calls handleSaleEndPending to initialize the state based on localStorage.
   */
  useEffect(() => {
    handleSaleEndPending();
    window.addEventListener(SALE_END_UPDATED_EVENT, handleSaleEndPending);

    return () => {
      window.removeEventListener(SALE_END_UPDATED_EVENT, handleSaleEndPending);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSaleEndPending]);

  /**
   * Reset the 5-minute timeout whenever the saleEndSongIds state changes.
   */
  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (saleEndSongIds?.length) {
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
  }, [saleEndSongIds]);

  /**
   * Update saleEndSongIds in localStorage whenever sales data is updated.
   */
  useEffect(() => {
    const pendingSales = localStorage.getItem(
      LOCAL_STORAGE_SALE_END_PENDING_KEY
    );

    if (pendingSales && !isGetSalesLoading) {
      const parsedPendingSales: string[] = JSON.parse(pendingSales);

      if (parsedPendingSales.length > 0) {
        // Filter out any song IDs that are no longer in the sales data
        const updatedPendingSales = parsedPendingSales.filter((songId) =>
          sales.find((sale) => sale.song.id === songId)
        );

        localStorage.setItem(
          LOCAL_STORAGE_SALE_END_PENDING_KEY,
          JSON.stringify(updatedPendingSales)
        );

        window.dispatchEvent(new Event(SALE_END_UPDATED_EVENT));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_SALE_END_PENDING_KEY);

        window.dispatchEvent(new Event(SALE_END_UPDATED_EVENT));
      }
    }
  }, [isGetSalesLoading, sales]);

  return null;
};

export default PingSaleEnd;
