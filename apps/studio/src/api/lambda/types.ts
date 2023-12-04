export interface GenerateArtistAgreementBody {
  readonly songName: string;
  readonly companyName?: string;
  readonly artistName: string;
  readonly stageName?: string;
  readonly songId?: string;
  readonly saved?: boolean;
}

export interface GenerateArtistAgreementResponse {
  readonly message: string;
}
