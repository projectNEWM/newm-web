import { RootState } from "../store";
import { RenderOptions } from "@testing-library/react";
import { EnhancedStore } from "@reduxjs/toolkit";
import { Song } from "../modules/song";

export interface RenderProps extends RenderOptions {
  readonly preloadedState?: Partial<RootState>;
  readonly store?: EnhancedStore;
}

export enum BarcodeType {
  UPC = "UPC",
  EAN = "EAN",
  JAN = "JAN",
}

export interface BarcodeConfig {
  regEx: RegExp;
  message: string;
}

export interface PlayerState {
  readonly currentPlayingSongId?: string;
  readonly loadingSongId?: string;
  readonly isReadyToPlay: boolean;
  readonly song?: Song;
}