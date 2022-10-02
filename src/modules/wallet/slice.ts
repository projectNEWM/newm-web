import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WalletState } from "./types";

const initialState: WalletState = {
  isLoading: false,
  walletName: "",
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
      state.walletName = payload;
    },
    receiveAdaUsdRate(state, { payload }: PayloadAction<string | number>) {
      const rate = typeof payload === "string" ? parseFloat(payload) : payload;
      state.adaUsdRate = rate;
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
