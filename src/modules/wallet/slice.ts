import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { last } from "lodash";
import { AdaUsdRateResponse, WalletState } from "./types";

const initialState: WalletState = {
  isLoading: false,
  walletName: localStorage.getItem("walletName") || "",
  isConnected: false,
  adaUsdRate: undefined,
};

const walletSlice = createSlice({
  initialState,
  name: "wallet",
  reducers: {
    setWalletIsLoading(state, { payload }: PayloadAction<boolean>) {
      state.isLoading = payload;
    },
    setWalletIsConnected(state, { payload }: PayloadAction<boolean>) {
      state.isConnected = payload;
    },
    setWalletName(state, { payload }: PayloadAction<string>) {
      if (payload) {
        localStorage.setItem("walletName", payload);
      } else {
        localStorage.removeItem("walletName");
      }

      state.walletName = payload;
    },
    receiveAdaUsdRate(state, action: PayloadAction<AdaUsdRateResponse>) {
      const recentData = last(
        Object.values(action.payload.timeSeriesCrypto5Min)
      );

      state.adaUsdRate = recentData ? parseFloat(recentData.close) : undefined;
    },
  },
});

export const {
  setWalletName,
  setWalletIsConnected,
  setWalletIsLoading,
  receiveAdaUsdRate,
} = walletSlice.actions;

export default walletSlice.reducer;
