import { ReactElement } from "react";
import { RootState } from "@newm.io/studio/store";
import { RenderOptions } from "@testing-library/react";
import { EnhancedStore } from "@reduxjs/toolkit";
import { Song } from "@newm.io/studio/modules/song";

export interface EmptyResponse {
  readonly data: null;
}

export interface StringMap {
  readonly [key: string]: string;
}

export interface WindowDimensions {
  readonly height: number;
  readonly width: number;
}

export interface RenderProps extends RenderOptions {
  readonly preloadedState?: Partial<RootState>;
  readonly store?: EnhancedStore;
}

export interface WrapperProps {
  readonly children: ReactElement;
}

export interface ValidateDimensionsParams {
  readonly imageUrl: string;
  readonly minWidth: number;
  readonly minHeight: number;
}

export type WidthType = "default" | "full";

export interface FieldOptions {
  error: unknown;
  element: HTMLDivElement | HTMLInputElement | HTMLTextAreaElement | null;
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

export type CustomError = {
  error: {
    data: {
      code: number;
      cause: string;
      description: string;
    };
  };
  status: number;
};
