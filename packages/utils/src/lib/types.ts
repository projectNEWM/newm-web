import { ReactElement } from "react";

export interface ValidateDimensionsParams {
  readonly imageUrl: string;
  readonly minWidth: number;
  readonly minHeight: number;
}

export interface WindowDimensions {
  readonly height: number;
  readonly width: number;
}

export interface UseWrappedThunkResponse<Returned> {
  readonly isLoading: boolean;
  readonly data?: Returned;
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

export interface ResizeOptions {
  height: number;
  width: number;
}

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
  error: unknown;
  element: HTMLDivElement | HTMLInputElement | HTMLTextAreaElement | null;
}
