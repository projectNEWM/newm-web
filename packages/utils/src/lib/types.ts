import { Song } from "@newm-web/types";
import { ReactElement } from "react";

export interface ValidateDimensionsParams {
  readonly imageUrl: string;
  readonly minHeight: number;
  readonly minWidth: number;
}

export interface WindowDimensions {
  readonly height?: number;
  readonly width?: number;
}

export interface UseWrappedThunkResponse<Returned> {
  readonly data?: Returned;
  readonly isError: boolean;
  readonly isLoading: boolean;
  readonly isSuccess: boolean;
}

export type CustomError = {
  error: {
    data: {
      cause: string;
      code: number;
      description: string;
    };
  };
  status: number;
};

export interface EmptyResponse {
  readonly data: null;
}

export interface StringMap {
  readonly [key: string]: string;
}

export interface WrapperProps {
  readonly children: ReactElement;
}

export type WidthType = "default" | "full";

export interface FieldOptions {
  element: HTMLDivElement | HTMLInputElement | HTMLTextAreaElement | null;
  error: unknown;
}

export interface UseHlsJsParams {
  readonly onPlaySong?: (song: Song) => void;
  readonly onStopSong?: (song?: Song) => void;
  readonly onSongEnded?: (event: Event) => any; // eslint-disable-line
}

export interface UseHlsJsResult {
  readonly audioProgress: number;
  readonly playSong: (song: Song) => void;
  readonly stopSong: (song?: Song) => void;
}

export interface ResizeImageOptions {
  readonly height: number;
  readonly width: number;
}

export interface TimeRemaining {
  readonly days?: string;
  readonly hours?: string;
  readonly minutes?: string;
  readonly seconds?: string;
  readonly total: number;
}
