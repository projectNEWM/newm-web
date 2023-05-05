import { createSlice } from "@reduxjs/toolkit";
import { UIState } from "./types";

const initialState: UIState = {
  toast: {
    heading: "",
    message: "",
    severity: "error",
  },
  isIdenfyModalOpen: false,
  isConnectWalletModalOpen: false,
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
    setToastMessage: (state, { payload }) => {
      state.toast.heading = payload.heading;
      state.toast.message = payload.message;
      state.toast.severity = payload.severity;
    },
    setIsIdenfyModalOpen: (state, { payload }) => {
      state.isIdenfyModalOpen = payload;
    },
    setIsConnectWalletModalOpen: (state, { payload }) => {
      state.isConnectWalletModalOpen = payload;
    },
  },
});

export const {
  clearToastMessage,
  setToastMessage,
  setIsIdenfyModalOpen,
  setIsConnectWalletModalOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
