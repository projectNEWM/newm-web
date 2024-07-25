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
  SaleStartPendingSongs,
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
   * Handle the pending state for sale start.
   */
  const handleSaleStartPending = useCallback(() => {
    const pendingSales = localStorage.getItem(
      LOCAL_STORAGE_SALE_START_PENDING_KEY
    );
    if (pendingSales) {
      const parsedPendingSales: SaleStartPendingSongs =
        JSON.parse(pendingSales);
      setIsSaleStartPending(!!parsedPendingSales[songId]);
    } else {
      setIsSaleStartPending(false);
    }
  }, [songId]);

  /**
   * Handle the pending state for sale end.
   */
  const handleSaleEndPending = useCallback(() => {
    const pendingSales = localStorage.getItem(
      LOCAL_STORAGE_SALE_END_PENDING_KEY
    );
    if (pendingSales) {
      const parsedPendingSales: string[] = JSON.parse(pendingSales);
      setIsSaleEndPending(parsedPendingSales.includes(songId));
    } else {
      setIsSaleEndPending(false);
    }
  }, [songId]);

  /**
   * Initialize and manage the event listeners for pending sales updates.
   */
  useEffect(() => {
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
  }, [handleSaleEndPending, handleSaleStartPending]);

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
