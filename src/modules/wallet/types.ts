export interface WalletState {
  readonly selectedWallet: string;
}

export interface Wallet {
  readonly name: string;
  readonly logo: string;
  readonly extensionUrl: string;
  readonly primaryUrl: string;
}

export interface Wallets {
  readonly [key: string]: Wallet;
}
