import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WalletState } from "./types";

const initialState: WalletState = {
  walletName: localStorage.getItem("walletName") || "",
  errorMessage: "",
};

const walletSlice = createSlice({
  initialState,
  name: "wallet",
  reducers: {
    setWalletName(state, action: PayloadAction<string>) {
      localStorage.setItem("walletName", action.payload);
      state.walletName = action.payload;
    },
    setWalletErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
});

export const { setWalletName, setWalletErrorMessage } = walletSlice.actions;

export default walletSlice.reducer;
