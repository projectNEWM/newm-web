import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useGetSalesQuery } from "../../modules/sale";
import {
  LOCAL_STORAGE_PENDING_SALES_KEY,
  PENDING_SALES_UPDATED_EVENT,
} from "../../common";

const PingPendingSales: FunctionComponent = () => {
  const [currentPollingInterval, setPollingInterval] = useState<number>();
  const [pendingSaleSongIds, setPendingSaleSongIds] = useState<string[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const { data: sales = [] } = useGetSalesQuery(
    {
      songIds: pendingSaleSongIds,
    },
    {
      pollingInterval: currentPollingInterval,
      skip: !pendingSaleSongIds || pendingSaleSongIds.length === 0,
    }
  );

  const handlePendingSales = useCallback(() => {
    const pendingSales = localStorage.getItem(LOCAL_STORAGE_PENDING_SALES_KEY);

    if (pendingSales) {
      const parsedPendingSales = JSON.parse(pendingSales);

      setPendingSaleSongIds(parsedPendingSales);
      setPollingInterval(15000); // 15 seconds in milliseconds
    } else {
      setPendingSaleSongIds([]);
      setPollingInterval(undefined);
    }
  }, []);

  /**
   * Initialize and manage the event listener for pending sales updates.
   * It also calls handlePendingSales to initialize the state based on localStorage.
   */
  useEffect(() => {
    handlePendingSales();
    window.addEventListener(PENDING_SALES_UPDATED_EVENT, handlePendingSales);

    return () => {
      window.removeEventListener(
        PENDING_SALES_UPDATED_EVENT,
        handlePendingSales
      );

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlePendingSales]);

  /**
   * Reset the 5-minute timeout whenever the pendingSaleSongIds state changes.
   */
  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (pendingSaleSongIds.length > 0) {
      const newTimeoutId = setTimeout(() => {
        setPollingInterval(undefined);
      }, 300000); // 5 minutes in milliseconds

      setTimeoutId(newTimeoutId);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingSaleSongIds]);

  /**
   * Update pendingSaleSongIds in localStorage whenever sales data is updated.
   */
  useEffect(() => {
    if (sales.length > 0) {
      const pendingSales = localStorage.getItem(
        LOCAL_STORAGE_PENDING_SALES_KEY
      );
      if (pendingSales) {
        const parsedPendingSales: string[] = JSON.parse(pendingSales);
        const updatedPendingSales = parsedPendingSales.filter(
          (songId) => !sales.find((sale) => sale.song.id === songId)
        );

        localStorage.setItem(
          LOCAL_STORAGE_PENDING_SALES_KEY,
          JSON.stringify(updatedPendingSales)
        );

        window.dispatchEvent(new Event(PENDING_SALES_UPDATED_EVENT));
      }
    }
  }, [sales]);

  return null;
};

export default PingPendingSales;
