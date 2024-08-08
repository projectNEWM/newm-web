export interface WalletState {
  readonly connectionData: {
    readonly connectionId: AnswerChallengeResponse["connectionId"];
    readonly expiresAt: AnswerChallengeResponse["expiresAt"];
  };
}

/**
 * AnswerChallenge as stored in the NEWM API.
 */
export interface AnswerChallengeRequest {
  challengeId: string;
  key?: string;
  payload: string;
}

/**
 * AnswerChallenge as stored in the NEWM API.
 */
export interface AnswerChallengeResponse {
  connectionId: string;
  expiresAt: string;
}

/**
 * GenerateChallenge as stored in the NEWM API.
 */
export interface GenerateChallengeResponse {
  challengeId: string;
  expiresAt: string;
  payload: string;
}

/**
 * GenerateChallenge as stored in the NEWM API.
 */
export type GenerateChallengeRequest =
  | GenerateChallengeRequestSignedData
  | GenerateChallengeRequestSignedTransaction;

/**
 * Get ADA price in USD (6 decimal places), e.g a value
 * of 1234567 means $1.234567 USD.
 */
export interface GetAdaUsdConversionResponse {
  readonly usdPrice: number;
}

/**
 * Get NEWM price in USD (6 decimal places), e.g a value
 * of 1234567 means $1.234567 USD.
 */
export interface GetNewmUsdConversionResponse {
  readonly usdPrice: number;
}

export enum ChallengeMethod {
  SignedData = "SignedData",
  SignedTransaction = "SignedTransaction",
}

interface GenerateChallengeRequestSignedData {
  changeAddress?: string;
  method: ChallengeMethod.SignedData;
  stakeAddress: string;
  utxoCborHexList?: string[];
}

interface GenerateChallengeRequestSignedTransaction {
  changeAddress: string;
  method: ChallengeMethod.SignedTransaction;
  stakeAddress: string;
  utxoCborHexList: string[];
}
