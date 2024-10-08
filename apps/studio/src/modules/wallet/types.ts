export interface WalletState {
  readonly walletAdaBalance: number;
  readonly walletAddress?: string;
  readonly walletNewmBalance: number;
}

export type GetEarningsResponse = {
  readonly amountCborHex: string;
  readonly earnings: Earning[];
  readonly totalClaimed: number;
};

export type PostEarningsRequest = {
  readonly changeAddress: string;
  readonly utxoCborHexList: string[];
  readonly walletAddress: string;
};
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
