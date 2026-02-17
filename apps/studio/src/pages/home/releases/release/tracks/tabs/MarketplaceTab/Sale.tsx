import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { SaleStatus } from "@newm-web/types";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";

import { ActiveSale } from "./ActiveSale";
import { CreateSale } from "./CreateSale";
import SaleEndPending from "./SaleEndPending";
import SaleStartPending from "./SaleStartPending";
import { ConnectWallet } from "./ConnectWallet";
import { SoldOutSale } from "./SoldOutSale";
import SaleCompletePending from "./SaleCompletePending";
import {
  LOCAL_STORAGE_SALE_COMPLETE_PENDING_KEY,
  LOCAL_STORAGE_SALE_END_PENDING_KEY,
  LOCAL_STORAGE_SALE_START_PENDING_KEY,
  SALE_COMPLETE_UPDATED_EVENT,
  SALE_END_UPDATED_EVENT,
  SALE_START_UPDATED_EVENT,
  SaleStartPendingSongs,
} from "../../../../../../../common";
import { MarketplaceTabSkeleton } from "../../../../../../../components";
import {
  useGetSalesQuery,
  useHasSongTokens,
} from "../../../../../../../modules/sale";

export const Sale = () => {
  const {
    isConnected,
    wallet,
    getChangeAddress,
    isLoading: isWalletLoading,
  } = useConnectWallet();
  const { trackId } = useParams<"trackId">() as { trackId: string };

  const [walletAddress, setWalletAddress] = useState("");
  const [isSaleEndPending, setIsSaleEndPending] = useState(false);
  const [isSaleStartPending, setIsSaleStartPending] = useState(false);
  const [isSaleCompletePending, setIsSaleCompletePending] = useState(false);
  const [isPendingSalesLoading, setIsPendingSalesLoading] = useState(true);
  const { hasTokens, isLoading: isHasTokensLoading } =
    useHasSongTokens(trackId);
  const {
    data: sales = [],
    isLoading: isGetSalesLoading,
    isUninitialized: isGetSalesUninitialized,
    refetch: refetchSales,
  } = useGetSalesQuery(
    {
      addresses: [walletAddress],
      saleStatuses: [SaleStatus.Started, SaleStatus.SoldOut],
      songIds: [trackId],
    },
    { skip: !walletAddress }
  );

  const isLoading =
    isWalletLoading ||
    isPendingSalesLoading ||
    isHasTokensLoading ||
    isGetSalesLoading;

  const activeSale = sales.find((sale) => sale.status === SaleStatus.Started);
  const soldOutSale = sales.find((sale) => sale.status === SaleStatus.SoldOut);

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
      setIsSaleStartPending(!!parsedPendingSales[trackId]);
    } else {
      setIsSaleStartPending(false);
    }
  }, [trackId]);

  /**
   * Handle the pending state for sale end.
   */
  const handleSaleEndPending = useCallback(() => {
    const pendingSales = localStorage.getItem(
      LOCAL_STORAGE_SALE_END_PENDING_KEY
    );

    if (pendingSales) {
      const parsedPendingSales: string[] = JSON.parse(pendingSales);
      setIsSaleEndPending(parsedPendingSales.includes(trackId));
    } else {
      setIsSaleEndPending(false);
    }
  }, [trackId]);

  /**
   * Handle the pending state for sold out sale close.
   */
  const handleSaleCompletePending = useCallback(() => {
    const pendingSales = localStorage.getItem(
      LOCAL_STORAGE_SALE_COMPLETE_PENDING_KEY
    );

    if (pendingSales) {
      const parsedPendingSales: string[] = JSON.parse(pendingSales);
      setIsSaleCompletePending(parsedPendingSales.includes(trackId));
    } else {
      setIsSaleCompletePending(false);
    }
  }, [trackId]);

  /**
   * Refetch sales when the pending status changes.
   */
  useEffect(() => {
    if (!isGetSalesUninitialized) {
      refetchSales();
    }
  }, [
    isGetSalesUninitialized,
    isSaleEndPending,
    isSaleStartPending,
    isSaleCompletePending,
    refetchSales,
  ]);

  /**
   * Gets an address from the wallet and updates the state.
   */
  useEffect(() => {
    if (!wallet) return;

    getChangeAddress(setWalletAddress);
  }, [wallet, getChangeAddress]);

  /**
   * Initialize and manage the event listeners for pending sales updates.
   */
  useEffect(() => {
    handleSaleEndPending();
    handleSaleStartPending();
    handleSaleCompletePending();

    window.addEventListener(SALE_END_UPDATED_EVENT, handleSaleEndPending);
    window.addEventListener(SALE_START_UPDATED_EVENT, handleSaleStartPending);
    window.addEventListener(
      SALE_COMPLETE_UPDATED_EVENT,
      handleSaleCompletePending
    );

    setIsPendingSalesLoading(false);

    return () => {
      window.removeEventListener(SALE_END_UPDATED_EVENT, handleSaleEndPending);
      window.removeEventListener(
        SALE_START_UPDATED_EVENT,
        handleSaleStartPending
      );
      window.removeEventListener(
        SALE_COMPLETE_UPDATED_EVENT,
        handleSaleCompletePending
      );
    };
  }, [handleSaleEndPending, handleSaleStartPending, handleSaleCompletePending]);

  if (isLoading) {
    return <MarketplaceTabSkeleton />;
  }

  if (!isConnected || (!activeSale && !soldOutSale && !hasTokens)) {
    return <ConnectWallet />;
  }

  if (isSaleStartPending) {
    return <SaleStartPending />;
  }

  if (isSaleEndPending) {
    return <SaleEndPending />;
  }

  if (isSaleCompletePending) {
    return <SaleCompletePending />;
  }

  if (soldOutSale) {
    return <SoldOutSale sale={ soldOutSale } />;
  }

  if (activeSale) {
    return <ActiveSale sale={ activeSale } />;
  }

  return <CreateSale />;
};
