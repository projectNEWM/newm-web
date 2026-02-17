import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WalletState } from "@newm-web/types";

const initialState: WalletState = {
  walletAdaBalance: 0,
  walletAddress: undefined,
  walletNewmBalance: 0,
};

const walletSlice = createSlice({
  initialState,
  name: "wallet",
  reducers: {
    setWalletAdaBalance: (state, action: PayloadAction<number>) => {
      state.walletAdaBalance = action.payload;
    },
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
    },
    setWalletNewmBalance: (state, action: PayloadAction<number>) => {
      state.walletNewmBalance = action.payload;
    },
  },
});

export const { setWalletAdaBalance, setWalletNewmBalance, setWalletAddress } =
  walletSlice.actions;

export default walletSlice.reducer;
