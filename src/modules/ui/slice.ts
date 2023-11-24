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
  updateWalletAddressModal: {
    message: "",
    isConfirmationRequired: false,
  },
  isProgressBarModalOpen: false,
  isIdenfyModalOpen: false,
  isConnectWalletModalOpen: false,
  isInvitesModalOpen: false,
  isWalletEnvMismatchModalOpen: false,
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
    setUpdateWalletAddressModal: (
      state,
      { payload }: PayloadAction<UIState["updateWalletAddressModal"]>
    ) => {
      state.updateWalletAddressModal = payload;
    },
    setIsWalletEnvMismatchModalOpen: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isWalletEnvMismatchModalOpen = payload;
    },
  },
});

export const {
  clearToastMessage,
  setToastMessage,
  setProgressBarModal,
  setUpdateWalletAddressModal,
  clearProgressBarModal,
  setIsProgressBarModalOpen,
  setIsIdenfyModalOpen,
  setIsConnectWalletModalOpen,
  setIsInvitesModalOpen,
  setIsWalletEnvMismatchModalOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
