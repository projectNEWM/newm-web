import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SaleStatus } from "@newm-web/types";
import { ActiveSale } from "./ActiveSale";
import { CreateSale } from "./CreateSale";
import SaleEndPending from "./SaleEndPending";
import SaleStartPending from "./SaleStartPending";
import {
  LOCAL_STORAGE_SALE_END_PENDING_KEY,
  LOCAL_STORAGE_SALE_START_PENDING_KEY,
  SALE_END_UPDATED_EVENT,
  SALE_START_UPDATED_EVENT,
} from "../../../../common";
import { MarketplaceTabSkeleton } from "../../../../components";
import { useGetSalesQuery } from "../../../../modules/sale";
import { SongRouteParams } from "../types";

export const Sale = () => {
  const { songId } = useParams<"songId">() as SongRouteParams;
  const [isSaleEndPending, setIsSaleEndPending] = useState(false);
  const [isSaleStartPending, setIsSaleStartPending] = useState(false);
  const [isPendingSalesLoading, setIsPendingSalesLoading] = useState(true);
  const { data: sales = [], isLoading } = useGetSalesQuery({
    saleStatuses: [SaleStatus.Started],
    songIds: [songId],
  });

  /**
   * Handle the pending state for sales start or end.
   */
  const handleSalePending = useCallback(
    (key: string, setState: (value: boolean) => void) => {
      const pendingSales = localStorage.getItem(key);
      if (pendingSales) {
        const parsedPendingSales = JSON.parse(pendingSales);
        setState(parsedPendingSales.includes(songId));
      }
    },
    [songId]
  );

  /**
   * Initialize and manage the event listeners for pending sales updates.
   * It also calls the handleSalePending to initialize the state based on localStorage.
   */
  useEffect(() => {
    const handleSaleEndPending = () =>
      handleSalePending(
        LOCAL_STORAGE_SALE_END_PENDING_KEY,
        setIsSaleEndPending
      );
    const handleSaleStartPending = () =>
      handleSalePending(
        LOCAL_STORAGE_SALE_START_PENDING_KEY,
        setIsSaleStartPending
      );

    handleSaleEndPending();
    handleSaleStartPending();

    window.addEventListener(SALE_END_UPDATED_EVENT, handleSaleEndPending);
    window.addEventListener(SALE_START_UPDATED_EVENT, handleSaleStartPending);

    setIsPendingSalesLoading(false);

    return () => {
      window.removeEventListener(SALE_END_UPDATED_EVENT, handleSaleEndPending);
      window.removeEventListener(
        SALE_START_UPDATED_EVENT,
        handleSaleStartPending
      );
    };
  }, [handleSalePending]);

  if (isLoading || isPendingSalesLoading) {
    return <MarketplaceTabSkeleton />;
  }

  if (isSaleStartPending) {
    return <SaleStartPending />;
  }

  if (isSaleEndPending) {
    return <SaleEndPending />;
  }

  return sales.length > 0 ? <ActiveSale /> : <CreateSale />;
};
