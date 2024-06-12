import { PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";

export interface StoreState {
  readonly num: number;
}

export interface Context {
  readonly dispatch: Dispatch<PayloadAction>;
  readonly state: StoreState;
}
