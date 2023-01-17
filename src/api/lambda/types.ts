export interface GenerateArtistAgreementBody {
  readonly songName: string;
  readonly companyName: string;
  readonly artistName: string;
  readonly stageName: string;
}

export interface GenerateArtistAgreementResponse {
  readonly message: string;
}
