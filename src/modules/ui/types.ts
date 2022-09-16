export interface UIState {
  readonly toast: {
    readonly heading: string;
    readonly message: string;
    readonly severity?: "error" | "success";
  };
  readonly isSelectWalletModalOpen: boolean;
}
