import { RenderOptions } from "@testing-library/react";
import { EnhancedStore } from "@reduxjs/toolkit";
import { Song } from "@newm-web/types";

import { RootState } from "../store";

export interface RenderProps extends RenderOptions {
  readonly preloadedState?: Partial<RootState>;
  readonly store?: EnhancedStore;
}

export enum BarcodeType {
  EAN = "EAN",
  JAN = "JAN",
  UPC = "UPC",
}

export interface BarcodeConfig {
  message: string;
  regEx: RegExp;
}

export interface PlayerState {
  readonly currentPlayingSongId?: string;
  readonly isReadyToPlay: boolean;
  readonly loadingSongId?: string;
  readonly song?: Song;
}

interface SaleDetails {
  tokensToSell: string;
  totalSaleValue: string;
}

export interface SaleStartPendingSongs {
  [key: string]: SaleDetails;
}

export enum PortfolioTableFilter {
  All = "all",
  Month = "month",
  Week = "week",
  Year = "year",
}

export interface ReferralHeroOptinData {
  email: string;
  people_referred?: number;
  referral_link?: string;
  referral_value?: number;
}

export interface ReferralHeroObject {
  getUserReferralCount?: () => number;
  getUserWalletAddress?: () => string | null;
  identify: (data: { email: string }, force?: boolean) => void;
  optin_data?: ReferralHeroOptinData;
}

// Extend the Window interface
declare global {
  interface Window {
    [key: `RH_${string}`]: ReferralHeroObject;
  }
}
