export interface GenerateArtistAgreementBody {
  readonly artistName: string;
  readonly companyName?: string;
  readonly saved?: boolean;
  readonly songId?: string;
  readonly songName: string;
  readonly stageName?: string;
}

export interface GenerateArtistAgreementResponse {
  readonly message: string;
}
