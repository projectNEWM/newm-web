export interface GenerateArtistAgreementBody {
  readonly songName: string;
  readonly companyName?: string;
  readonly artistName: string;
  readonly stageName?: string;
  readonly songId?: string;
  readonly save?: boolean;
}

export interface GenerateArtistAgreementResponse {
  readonly message: string;
}

export interface GenerateArtistAgreementPayload {
  readonly body: GenerateArtistAgreementBody;
  readonly callback?: VoidFunction;
}
