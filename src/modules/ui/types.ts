import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

export interface UIState {
  toast: {
    heading?: string;
    message: string;
    severity?: "error" | "success";
  };
  progressBarModal: {
    progress: number;
    message: string;
    disclaimer: string;
    animationSeconds: number;
  };
  updateWalletAddressModal: {
    message: string;
    isConfirmationRequired: boolean;
  };
  isArtistPricePlanSelected: boolean;
  isProgressBarModalOpen: boolean;
  isIdenfyModalOpen: boolean;
  isConnectWalletModalOpen: boolean;
  isInvitesModalOpen: boolean;
  isWalletEnvMismatchModalOpen: boolean;
}

export interface UploadProgressParams {
  readonly progress?: number;
  readonly baseProgress: number;
  readonly totalIncrement: number;
  readonly message: string;
  readonly disclaimer: string;
  readonly dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
}
