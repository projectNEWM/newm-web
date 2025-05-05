import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { SaleStatus } from "@newm-web/types";
import {
  FIFTEEN_SECONDS_IN_MILLISECONDS,
  FIVE_MINUTES_IN_MILLISECONDS,
} from "@newm-web/utils";
import { useGetSalesQuery } from "../../modules/sale";
import {
  LOCAL_STORAGE_SALE_COMPLETE_PENDING_KEY,
  SALE_COMPLETE_UPDATED_EVENT,
} from "../../common";

const PingSaleComplete: FunctionComponent = () => {
  const [currentPollingInterval, setPollingInterval] = useState<number>();
  const [saleCompleteSongIds, setSaleCompleteSongIds] = useState<
    string[] | null
  >();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const { data: sales = [], isLoading: isGetSalesLoading } = useGetSalesQuery(
    {
      saleStatuses: [SaleStatus.SoldOut],
      songIds: saleCompleteSongIds || undefined,
    },
    {
      pollingInterval: currentPollingInterval,
      skip:
        saleCompleteSongIds === null ||
        (saleCompleteSongIds && saleCompleteSongIds.length === 0),
    }
  );

  const handleSaleComplete = useCallback(() => {
    const pendingSales = localStorage.getItem(
      LOCAL_STORAGE_SALE_COMPLETE_PENDING_KEY
    );

    if (pendingSales) {
      const parsedPendingSales = JSON.parse(pendingSales);

      setSaleCompleteSongIds(parsedPendingSales);
      setPollingInterval(FIFTEEN_SECONDS_IN_MILLISECONDS);
    } else {
      setSaleCompleteSongIds(null);
      setPollingInterval(undefined);
    }
  }, []);

  /**
   * Initialize and manage the event listener for pending sales updates. It
   * also calls handleSaleComplete to initialize the state based on localStorage.
   */
  useEffect(() => {
    handleSaleComplete();
    window.addEventListener(SALE_COMPLETE_UPDATED_EVENT, handleSaleComplete);

    return () => {
      window.removeEventListener(
        SALE_COMPLETE_UPDATED_EVENT,
        handleSaleComplete
      );

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSaleComplete]);

  /**
   * Reset the 5-minute timeout whenever the saleCompleteSongIds state changes.
   */
  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (saleCompleteSongIds?.length) {
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
  }, [saleCompleteSongIds]);

  /**
   * Update saleCompleteSongIds in localStorage whenever sales data is updated.
   */
  useEffect(() => {
    const pendingSales = localStorage.getItem(
      LOCAL_STORAGE_SALE_COMPLETE_PENDING_KEY
    );

    if (pendingSales && !isGetSalesLoading) {
      const parsedPendingSales: string[] = JSON.parse(pendingSales);

      if (parsedPendingSales.length > 0) {
        // Filter out any song IDs that are no longer in the sales data
        const updatedPendingSales = parsedPendingSales.filter((songId) =>
          sales.find((sale) => sale.song.id === songId)
        );

        localStorage.setItem(
          LOCAL_STORAGE_SALE_COMPLETE_PENDING_KEY,
          JSON.stringify(updatedPendingSales)
        );
      } else {
        localStorage.removeItem(LOCAL_STORAGE_SALE_COMPLETE_PENDING_KEY);
      }

      window.dispatchEvent(new Event(SALE_COMPLETE_UPDATED_EVENT));
    }
  }, [isGetSalesLoading, sales]);

  return null;
};

export default PingSaleComplete;
