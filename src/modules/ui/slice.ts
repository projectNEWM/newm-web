import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UIState } from "./types";

const initialState: UIState = {
  toast: {
    heading: "",
    message: "",
    severity: "error",
  },
  progressBarModal: {
    progress: 0,
    message: "",
    disclaimer: "",
    animationSeconds: 0,
  },
  isProgressBarModalOpen: false,
  isIdenfyModalOpen: false,
  isConnectWalletModalOpen: false,
  isInvitesModalOpen: false,
  isUpdateWalletAddressModalOpen: false,
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
    setToastMessage: (state, { payload }: PayloadAction<UIState["toast"]>) => {
      state.toast = payload;
    },
    clearProgressBarModal: (state) => {
      state.progressBarModal = {
        progress: 0,
        message: "",
        disclaimer: "",
        animationSeconds: 0,
      };
    },
    setProgressBarModal: (
      state,
      { payload }: PayloadAction<UIState["progressBarModal"]>
    ) => {
      state.progressBarModal = payload;
    },
    setIsProgressBarModalOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isProgressBarModalOpen = payload;
    },
    setIsIdenfyModalOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isIdenfyModalOpen = payload;
    },
    setIsConnectWalletModalOpen: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isConnectWalletModalOpen = payload;
    },
    setIsInvitesModalOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isInvitesModalOpen = payload;
    },
    setIsUpdateWalletAddressModalOpen: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isUpdateWalletAddressModalOpen = payload;
    },
  },
});

export const {
  clearToastMessage,
  setToastMessage,
  setProgressBarModal,
  clearProgressBarModal,
  setIsProgressBarModalOpen,
  setIsIdenfyModalOpen,
  setIsConnectWalletModalOpen,
  setIsInvitesModalOpen,
  setIsUpdateWalletAddressModalOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
