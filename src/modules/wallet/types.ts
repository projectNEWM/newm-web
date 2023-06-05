export interface CreateMintSongPaymentRequest {
  readonly changeAddress: string;
  readonly utxoCborHexList: ReadonlyArray<string>;
}

export type CreateMintSongPaymentResponse = any; // eslint-disable-line

export interface GetMintSongPaymentResponse {
  readonly cborHex: string;
}
