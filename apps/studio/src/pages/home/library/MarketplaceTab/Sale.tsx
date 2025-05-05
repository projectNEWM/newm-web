import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SaleStatus } from "@newm-web/types";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { ActiveSale } from "./ActiveSale";
import { CreateSale } from "./CreateSale";
import SaleEndPending from "./SaleEndPending";
import SaleStartPending from "./SaleStartPending";
import { ConnectWallet } from "./ConnectWallet";
import {
  LOCAL_STORAGE_SALE_END_PENDING_KEY,
  LOCAL_STORAGE_SALE_START_PENDING_KEY,
  SALE_END_UPDATED_EVENT,
  SALE_START_UPDATED_EVENT,
  SaleStartPendingSongs,
} from "../../../../common";
import { MarketplaceTabSkeleton } from "../../../../components";
import { useGetSalesQuery, useHasSongTokens } from "../../../../modules/sale";
import { SongRouteParams } from "../types";

export const Sale = () => {
  const {
    isConnected,
    wallet,
    getChangeAddress,
    isLoading: isWalletLoading,
  } = useConnectWallet();
  const { songId } = useParams<"songId">() as SongRouteParams;
  const [walletAddress, setWalletAddress] = useState("");
  const [isSaleEndPending, setIsSaleEndPending] = useState(false);
  const [isSaleStartPending, setIsSaleStartPending] = useState(false);
  const [isSaleCompletedPending, setIsSaleCompletedPending] = useState(false);
  const [isPendingSalesLoading, setIsPendingSalesLoading] = useState(true);
  const { hasTokens, isLoading: isHasTokensLoading } = useHasSongTokens(songId);
  const {
    data: sales = [],
    isLoading: isGetSalesLoading,
    isUninitialized: isGetSalesUninitialized,
    refetch: refetchSales,
  } = useGetSalesQuery(
    {
      addresses: [walletAddress],
      saleStatuses: [SaleStatus.Started, SaleStatus.SoldOut],
      songIds: [songId],
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

  if (soldOutSale) {
    return "sold out placeholder";
  }

  if (activeSale) {
    return <ActiveSale sale={ activeSale } />;
  }

  return <CreateSale />;
};
