import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WalletState } from "./types";

const initialState: WalletState = {
  selectedWallet: "",
}

const walletSlice = createSlice({
  initialState,
  name: "wallet",
  reducers: {
    setSelectedWallet(state, action: PayloadAction<string>) {
      state.selectedWallet = action.payload;
    },
  },
});

export const { setSelectedWallet } = walletSlice.actions;

export default walletSlice.reducer;
