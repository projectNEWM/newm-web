import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UIState } from "./types";

const initialState: UIState = {
  isConnectWalletModalOpen: false,
  isIdenfyModalOpen: false,
  isInvitesModalOpen: false,
  isProgressBarModalOpen: false,
  isReferralDashboardModalOpen: false,
  isWalletEnvMismatchModalOpen: false,
  progressBarModal: {
    animationSeconds: 0,
    disclaimer: "",
    message: "",
    progress: 0,
  },
  toast: {
    heading: "",
    message: "",
    severity: "error",
  },
  updateWalletAddressModal: {
    isConfirmationRequired: false,
    message: "",
  },
};

const uiSlice = createSlice({
  initialState,
  name: "ui",
  reducers: {
    clearProgressBarModal: (state) => {
      state.progressBarModal = {
        animationSeconds: 0,
        disclaimer: "",
        message: "",
        progress: 0,
      };
    },
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
    setIsIdenfyModalOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isIdenfyModalOpen = payload;
    },
    setIsInvitesModalOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isInvitesModalOpen = payload;
    },
    setIsProgressBarModalOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isProgressBarModalOpen = payload;
    },
    setIsReferralDashboardModalOpen: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isReferralDashboardModalOpen = payload;
    },
    setIsWalletEnvMismatchModalOpen: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isWalletEnvMismatchModalOpen = payload;
    },
    setProgressBarModal: (
      state,
      { payload }: PayloadAction<UIState["progressBarModal"]>
    ) => {
      state.progressBarModal = payload;
    },
    setToastMessage: (state, { payload }: PayloadAction<UIState["toast"]>) => {
      state.toast = payload;
    },
    setUpdateWalletAddressModal: (
      state,
      { payload }: PayloadAction<UIState["updateWalletAddressModal"]>
    ) => {
      state.updateWalletAddressModal = payload;
    },
  },
});

export const {
  clearProgressBarModal,
  clearToastMessage,
  setIsConnectWalletModalOpen,
  setIsIdenfyModalOpen,
  setIsInvitesModalOpen,
  setIsProgressBarModalOpen,
  setIsReferralDashboardModalOpen,
  setIsWalletEnvMismatchModalOpen,
  setProgressBarModal,
  setToastMessage,
  setUpdateWalletAddressModal,
} = uiSlice.actions;

export default uiSlice.reducer;
