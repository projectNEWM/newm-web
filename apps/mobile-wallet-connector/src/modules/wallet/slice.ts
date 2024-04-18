import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WalletState } from "./types";

const initialState: WalletState = {
  connectionData: {
    connectionId: "",
    expiresAt: "",
  },
};

const walletSlice = createSlice({
  initialState,
  name: "wallet",
  reducers: {
    setConnectionData: (
      state,
      action: PayloadAction<WalletState["connectionData"]>
    ) => {
      state.connectionData = action.payload;
    },
  },
});

export const { setConnectionData } = walletSlice.actions;

export default walletSlice.reducer;
