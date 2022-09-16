export interface WalletState {
  readonly isLoading: boolean;
  readonly walletName: string;
  readonly isConnected: boolean;
  readonly adaUsdRate?: number;
}

// in the future, this can be replaced with actual return values
type AnyWalletValue = any; // eslint-disable-line

export interface UnitializedWallet {
  readonly apiVersion: "0.1.0";
  readonly name: "eternl";
  readonly enable: () => Promise<EnabledWallet>;
  readonly experimental: {
    readonly appVersion: {
      readonly major: number;
      readonly minor: number;
      readonly patch: number;
    };
  };
  readonly enableLogs: (enable: boolean) => AnyWalletValue;
  readonly icon: string;
  readonly isEnabled: () => Promise<boolean>;
}

export interface EnabledWallet {
  readonly experimental: {
    readonly appVersion: {
      readonly major: number;
      readonly minor: number;
      readonly patch: number;
    };
    readonly getCollateral: () => Promise<AnyWalletValue>;
    readonly getLockedUtxos: () => Promise<AnyWalletValue>;
    readonly syncAccount: () => Promise<AnyWalletValue>;
  };
  readonly getBalance: () => Promise<AnyWalletValue>;
  readonly getChangeAddress: () => Promise<AnyWalletValue>;
  readonly getCollateral: () => Promise<AnyWalletValue>;
  readonly getNetworkId: () => Promise<AnyWalletValue>;
  readonly getRewardAddresses: () => Promise<AnyWalletValue>;
  readonly getUnusedAddresses: () => Promise<AnyWalletValue>;
  readonly getUsedAddresses: (paginate: boolean) => Promise<AnyWalletValue>;
  readonly getUtxos: (
    amount?: number,
    paginate?: boolean
  ) => Promise<AnyWalletValue>;
  readonly signData: (
    addr: string,
    sigStructure: string
  ) => Promise<AnyWalletValue>;
  readonly signTx: (
    tx: AnyWalletValue,
    partialSign: boolean,
    createDebugTx: boolean
  ) => Promise<AnyWalletValue>;
  readonly submitTx: (tx: AnyWalletValue) => Promise<AnyWalletValue>;
}

export interface WalletInfo {
  readonly name: string;
  readonly displayName: string;
  readonly logo: string;
  readonly extensionUrl: string;
  readonly primaryUrl: string;
}

export interface Wallets {
  readonly [key: string]: WalletInfo;
}

interface CryptoData {
  readonly open: string;
  readonly high: string;
  readonly low: string;
  readonly close: string;
  readonly volume: number;
}

export interface AdaUsdRateResponse {
  readonly timeSeriesCrypto5Min: Record<string, CryptoData>;
}
