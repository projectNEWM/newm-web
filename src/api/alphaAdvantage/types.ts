interface CryptoData {
  readonly open: string;
  readonly high: string;
  readonly low: string;
  readonly close: string;
  readonly volume: number;
}

export interface AdaUsdResponse {
  readonly timeSeriesCrypto5Min: Record<string, CryptoData>;
}
