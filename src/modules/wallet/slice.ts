import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { last } from "lodash";
import { AdaUsdRateResponse, WalletState } from "./types";

const initialState: WalletState = {
  walletName: localStorage.getItem("walletName") || "",
  adaUsdRate: undefined,
};

const walletSlice = createSlice({
  initialState,
  name: "wallet",
  reducers: {
    setWalletName(state, action: PayloadAction<string>) {
      localStorage.setItem("walletName", action.payload);
      state.walletName = action.payload;
    },
    // eslint-disable-next-line
    receiveAdaUsdRate(state, action: PayloadAction<AdaUsdRateResponse>) {
      const recentData = last(
        Object.values(action.payload.timeSeriesCrypto5Min)
      );
      state.adaUsdRate = recentData
        ? parseFloat(recentData["close"])
        : undefined;
    },
  },
});

export const { setWalletName, receiveAdaUsdRate } = walletSlice.actions;

export default walletSlice.reducer;
