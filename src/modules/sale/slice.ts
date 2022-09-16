import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SaleBundlesResp, SaleState } from "./types";

const initialState: SaleState = {
  sales: [],
};

const walletSlice = createSlice({
  initialState,
  name: "sale",
  reducers: {
    receiveBundleSales(state, action: PayloadAction<SaleBundlesResp>) {
      state.sales = action.payload.data[1].ftSaleBundles;
    },
  },
});

export const { receiveBundleSales } = walletSlice.actions;

export default walletSlice.reducer;
