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
