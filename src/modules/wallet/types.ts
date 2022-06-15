export interface WalletState {
  readonly walletName: string;
  readonly errorMessage: string;
}

export interface Wallet {
  readonly name: string;
  readonly displayName: string;
  readonly logo: string;
  readonly extensionUrl: string;
  readonly primaryUrl: string;
}

export interface Wallets {
  readonly [key: string]: Wallet;
}
