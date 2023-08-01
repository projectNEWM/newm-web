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
  isProgressBarModalOpen: boolean;
  isIdenfyModalOpen: boolean;
  isConnectWalletModalOpen: boolean;
  isInvitesModalOpen: boolean;
  isUpdateWalletAddressModalOpen: boolean;
}
