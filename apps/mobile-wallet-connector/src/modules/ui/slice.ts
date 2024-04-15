import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UIState } from "./types";

const initialState: UIState = {
  isConnectWalletModalOpen: false,
  toast: {
    heading: "",
    message: "",
    severity: "error",
  },
};

const uiSlice = createSlice({
  initialState,
  name: "ui",
  reducers: {
    clearToastMessage: (state) => {
      state.toast.heading = "";
      state.toast.message = "";
      state.toast.severity = "error";
    },
    setIsConnectWalletModalOpen: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isConnectWalletModalOpen = payload;
    },
    setToastMessage: (state, { payload }: PayloadAction<UIState["toast"]>) => {
      state.toast = payload;
    },
  },
});

export const {
  clearToastMessage,
  setToastMessage,
  setIsConnectWalletModalOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
