export interface UIState {
  isConnectWalletModalOpen: boolean;
  toast: {
    heading?: string;
    message: string;
    severity?: "error" | "success";
  };
}
