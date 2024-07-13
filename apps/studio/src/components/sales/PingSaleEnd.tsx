import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { SaleStatus } from "@newm-web/types";
import { useGetSalesQuery } from "../../modules/sale";
import {
  LOCAL_STORAGE_SALE_END_PENDING_KEY,
  PENDING_SALE_PING_TIMEOUT,
  PENDING_SALE_POLLING_INTERVAL,
  SALE_END_UPDATED_EVENT,
} from "../../common";

const PingSaleEnd: FunctionComponent = () => {
  const [currentPollingInterval, setPollingInterval] = useState<number>();
  const [saleEndSongIds, setSaleEndSongIds] = useState<string[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const { data: sales = [], isLoading: isGetSalesLoading } = useGetSalesQuery(
    {
      saleStatuses: [SaleStatus.Started],
      songIds: saleEndSongIds,
    },
    {
      pollingInterval: currentPollingInterval,
      skip: !saleEndSongIds || saleEndSongIds.length === 0,
    }
  );

  const handleSaleEndPending = useCallback(() => {
    const pendingSales = localStorage.getItem(
      LOCAL_STORAGE_SALE_END_PENDING_KEY
    );

    if (pendingSales) {
      const parsedPendingSales = JSON.parse(pendingSales);

      setSaleEndSongIds(parsedPendingSales);
      setPollingInterval(PENDING_SALE_POLLING_INTERVAL);
    } else {
      setSaleEndSongIds([]);
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

    if (saleEndSongIds.length > 0) {
      const newTimeoutId = setTimeout(() => {
        setPollingInterval(undefined);
      }, PENDING_SALE_PING_TIMEOUT);

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
    if (sales.length === 0 && !isGetSalesLoading) {
      localStorage.removeItem(LOCAL_STORAGE_SALE_END_PENDING_KEY);
    } else {
      const pendingSales = localStorage.getItem(
        LOCAL_STORAGE_SALE_END_PENDING_KEY
      );

      if (pendingSales) {
        const parsedPendingSales: string[] = JSON.parse(pendingSales);

        // Filter out any song IDs that are no longer in the sales data
        const updatedPendingSales = parsedPendingSales.filter((songId) =>
          sales.find((sale) => sale.song.id === songId)
        );

        localStorage.setItem(
          LOCAL_STORAGE_SALE_END_PENDING_KEY,
          JSON.stringify(updatedPendingSales)
        );

        window.dispatchEvent(new Event(SALE_END_UPDATED_EVENT));
      }
    }
  }, [isGetSalesLoading, sales]);

  return null;
};

export default PingSaleEnd;
