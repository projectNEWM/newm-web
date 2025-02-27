export interface GetAdaUsdConversionResponse {
  // ADA price in USD (6 decimal places), e.g a value of 1234567 means $1.234567 USD
  readonly usdPrice: number;
}

export interface GetNewmUsdConversionResponse {
  // NEWM price in USD (6 decimal places), e.g a value of 1234567 means $1.234567 USD
  readonly usdPrice: number;
}

export interface WalletState {
  readonly walletAdaBalance: number;
  readonly walletAddress?: string;
  readonly walletNewmBalance: number;
}

export interface GetEarningsResponse {
  readonly amountCborHex: string;
  readonly earnings: Earning[];
  readonly totalClaimed: number;
}

export interface PostEarningsRequest {
  readonly changeAddress: string;
  readonly utxoCborHexList: string[];
  readonly walletAddress: string;
}
export interface PostEarningsResponse {
  readonly cborHex: string;
  readonly createdAt?: string;
  readonly earningsIds: string[];
  readonly errorMessage: string;
  readonly failedEarningsIds?: string[];
  readonly id?: string;
  readonly keyId: string;
  readonly paymentAddress: string;
  readonly paymentAmount?: number;
  readonly stakeAddress: string;
  readonly status: ClaimOrderStatus;
  readonly transactionId?: string;
}

interface Earning {
  readonly amount?: number;
  readonly claimOrderId?: string;
  readonly claimed?: boolean;
  readonly claimedAt?: string;
  readonly createdAt: string;
  readonly endDate?: string;
  readonly id?: string;
  readonly memo?: string;
  readonly songId?: string;
  readonly stakeAddress: string;
  readonly startDate?: string;
}

enum ClaimOrderStatus {
  Blocked = "Blocked",
  Completed = "Completed",
  Failed = "Failed",
  Pending = "Pending",
  Processing = "Processing",
  Timeout = "Timeout",
}

export interface ClaimEarningsThunkRequest {
  readonly amountCborHex: string;
  readonly unclaimedEarningsInNEWM: number;
  readonly unclaimedEarningsInUSD: number;
}

export type EarningsInProgress = {
  unclaimedEarningsInNEWM?: number;
  unclaimedEarningsInUSD?: number;
};
