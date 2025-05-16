import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

export interface UIState {
  isConnectWalletModalOpen: boolean;
  isIdenfyModalOpen: boolean;
  isInvitesModalOpen: boolean;
  isProgressBarModalOpen: boolean;
  isReferralDashboardModalOpen: boolean;
  isWalletEnvMismatchModalOpen: boolean;
  progressBarModal: {
    animationSeconds: number;
    disclaimer: string;
    message: string;
    progress: number;
  };
  toast: {
    heading?: string;
    message: string;
    severity?: "error" | "success";
  };
  updateWalletAddressModal: {
    isConfirmationRequired: boolean;
    message: string;
  };
}

export interface UploadProgressParams {
  readonly baseProgress: number;
  readonly disclaimer: string;
  readonly dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
  readonly message: string;
  readonly progress?: number;
  readonly totalIncrement: number;
}
