import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UIState } from "./types";

const initialState: UIState = {
  isConnectWalletModalOpen: false,
  isIdenfyModalOpen: false,
  isInvitesModalOpen: false,
  isProgressBarModalOpen: false,
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
  walletPortfolioTableFilter: "All",
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
    resetWalletPortfolioTableFilter: (state) => {
      state.walletPortfolioTableFilter =
        initialState.walletPortfolioTableFilter;
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
    setWalletPortfolioTableFilter: (state, action: PayloadAction<string>) => {
      state.walletPortfolioTableFilter = action.payload;
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
  setWalletPortfolioTableFilter,
  resetWalletPortfolioTableFilter,
} = uiSlice.actions;

export default uiSlice.reducer;
