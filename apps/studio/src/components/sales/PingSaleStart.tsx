import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { SaleStatus } from "@newm-web/types";
import { useGetSalesQuery } from "../../modules/sale";
import {
  LOCAL_STORAGE_SALE_START_PENDING_KEY,
  PENDING_SALE_PING_TIMEOUT,
  PENDING_SALE_POLLING_INTERVAL,
  SALE_START_UPDATED_EVENT,
} from "../../common";

const PingSaleStart: FunctionComponent = () => {
  const [currentPollingInterval, setPollingInterval] = useState<number>();
  const [saleStartSongIds, setSaleStartSongIds] = useState<string[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const { data: sales = [], isLoading: isGetSalesLoading } = useGetSalesQuery(
    {
      saleStatuses: [SaleStatus.Started],
      songIds: saleStartSongIds,
    },
    {
      pollingInterval: currentPollingInterval,
      skip: !saleStartSongIds || saleStartSongIds.length === 0,
    }
  );

  const handleSaleStartPending = useCallback(() => {
    const pendingSales = localStorage.getItem(
      LOCAL_STORAGE_SALE_START_PENDING_KEY
    );

    if (pendingSales) {
      const parsedPendingSales = JSON.parse(pendingSales);

      setSaleStartSongIds(parsedPendingSales);
      setPollingInterval(PENDING_SALE_POLLING_INTERVAL);
    } else {
      setSaleStartSongIds([]);
      setPollingInterval(undefined);
    }
  }, []);

  /**
   * Initialize and manage the event listener for pending sales updates.
   * It also calls handleSaleStartPending to initialize the state based on localStorage.
   */
  useEffect(() => {
    handleSaleStartPending();
    window.addEventListener(SALE_START_UPDATED_EVENT, handleSaleStartPending);

    return () => {
      window.removeEventListener(
        SALE_START_UPDATED_EVENT,
        handleSaleStartPending
      );

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSaleStartPending]);

  /**
   * Reset the 5-minute timeout whenever the saleStartSongIds state changes.
   */
  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (saleStartSongIds.length > 0) {
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
  }, [saleStartSongIds]);

  /**
   * Update saleStartSongIds in localStorage whenever sales data is updated.
   */
  useEffect(() => {
    const pendingSales = localStorage.getItem(
      LOCAL_STORAGE_SALE_START_PENDING_KEY
    );

    if (pendingSales && !isGetSalesLoading) {
      const parsedPendingSales: string[] = JSON.parse(pendingSales);

      if (parsedPendingSales.length > 0) {
        // Remove the songIds that have been successfully started
        const updatedPendingSales = parsedPendingSales.filter(
          (songId) => !sales.find((sale) => sale.song.id === songId)
        );

        localStorage.setItem(
          LOCAL_STORAGE_SALE_START_PENDING_KEY,
          JSON.stringify(updatedPendingSales)
        );

        window.dispatchEvent(new Event(SALE_START_UPDATED_EVENT));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_SALE_START_PENDING_KEY);

        window.dispatchEvent(new Event(SALE_START_UPDATED_EVENT));
      }
    }
  }, [sales, isGetSalesLoading]);

  return null;
};

export default PingSaleStart;
