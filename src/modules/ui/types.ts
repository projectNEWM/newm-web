export interface UIState {
  toast: {
    heading: string;
    message: string;
    severity?: "error" | "success";
  };
  isIdenfyModalOpen: boolean;
  isConnectWalletModalOpen: boolean;
}
