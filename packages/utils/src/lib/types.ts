export interface StringMap {
  readonly [key: string]: string;
}

export interface WindowDimensions {
  readonly height: number;
  readonly width: number;
}

export interface ValidateDimensionsParams {
  readonly imageUrl: string;
  readonly minWidth: number;
  readonly minHeight: number;
}
