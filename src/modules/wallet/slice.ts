import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WalletState } from "./types";

const initialState: WalletState = {
  balance: undefined,
};

const walletSlice = createSlice({
  initialState,
  name: "wallet",
  reducers: {
    setWalletBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
    },
  },
});

export const { setWalletBalance } = walletSlice.actions;

export default walletSlice.reducer;
