import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { SaleStatus } from "@newm-web/types";
import { useGetSalesQuery } from "../../modules/sale";
import {
  LOCAL_STORAGE_SALE_START_PENDING_KEY,
  PENDING_SALE_PING_TIMEOUT,
  PENDING_SALE_POLLING_INTERVAL,
  SALE_START_UPDATED_EVENT,
  SaleStartPendingSongs,
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
      const parsedPendingSales: SaleStartPendingSongs =
        JSON.parse(pendingSales);
      const songIds = Object.keys(parsedPendingSales);

      if (songIds.length > 0) {
        setSaleStartSongIds(songIds);
        setPollingInterval(PENDING_SALE_POLLING_INTERVAL);
        return;
      }
    }

    setSaleStartSongIds([]);
    setPollingInterval(undefined);
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
    if (!isGetSalesLoading) {
      const pendingSales = localStorage.getItem(
        LOCAL_STORAGE_SALE_START_PENDING_KEY
      );

      if (pendingSales) {
        const parsedPendingSales: SaleStartPendingSongs =
          JSON.parse(pendingSales);

        if (Object.keys(parsedPendingSales).length > 0) {
          // Remove the songIds that have been successfully started
          const updatedPendingSales = Object.keys(parsedPendingSales)
            .filter((songId) => !sales.find((sale) => sale.song.id === songId))
            .reduce((acc: SaleStartPendingSongs, songId) => {
              acc[songId] = parsedPendingSales[songId];
              return acc;
            }, {});

          if (Object.keys(updatedPendingSales).length > 0) {
            localStorage.setItem(
              LOCAL_STORAGE_SALE_START_PENDING_KEY,
              JSON.stringify(updatedPendingSales)
            );
          } else {
            localStorage.removeItem(LOCAL_STORAGE_SALE_START_PENDING_KEY);
          }

          window.dispatchEvent(new Event(SALE_START_UPDATED_EVENT));
        } else {
          localStorage.removeItem(LOCAL_STORAGE_SALE_START_PENDING_KEY);
          window.dispatchEvent(new Event(SALE_START_UPDATED_EVENT));
        }
      }
    }
  }, [sales, isGetSalesLoading]);

  return null;
};

export default PingSaleStart;
