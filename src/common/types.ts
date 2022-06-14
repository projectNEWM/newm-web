import { FunctionComponent, ReactElement } from "react";
import { RootState } from "store";
import { RenderOptions } from "@testing-library/react";
import { EnhancedStore } from "@reduxjs/toolkit";

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
