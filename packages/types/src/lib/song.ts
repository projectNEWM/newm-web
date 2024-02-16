export enum MarketplaceStatus {
  NotSelling = "NotSelling",
  Selling = "Selling",
}

export enum MintingStatus {
  ArweaveUploadException = "ArweaveUploadException",
  AwaitingAudioEncoding = "AwaitingAudioEncoding",
  AwaitingCollaboratorApproval = "AwaitingCollaboratorApproval",
  Declined = "Declined",
  Distributed = "Distributed",
  DistributionException = "DistributionException",
  Minted = "Minted",
  MintingException = "MintingException",
  MintingPaymentException = "MintingPaymentException",
  MintingPaymentReceived = "MintingPaymentReceived",
  MintingPaymentRequested = "MintingPaymentRequested",
  MintingPaymentSubmitted = "MintingPaymentSubmitted",
  MintingPaymentTimeout = "MintingPaymentTimeout",
  Pending = "Pending",
  ReadyToDistribute = "ReadyToDistribute",
  ReleaseCheckException = "ReleaseCheckException",
  Released = "Released",
  StreamTokenAgreementApproved = "StreamTokenAgreementApproved",
  SubmittedForDistribution = "SubmittedForDistribution",
  SubmittedForDistributionException = "SubmittedForDistributionException",
  Undistributed = "Undistributed",
}

export interface Song {
  readonly album?: string;
  readonly archived: boolean;
  readonly barcodeNumber?: string;
  readonly barcodeType?: string;
  readonly compositionCopyrightOwner: string;
  readonly compositionCopyrightYear: string;
  readonly coverArtUrl?: string;
  readonly coverRemixSample?: boolean;
  readonly createdAt: string;
  readonly description?: string;
  readonly duration?: number;
  readonly genres: ReadonlyArray<string>;
  readonly id: string;
  readonly ipis?: ReadonlyArray<string>;
  readonly isrc?: string;
  readonly iswc?: string;
  readonly language?: string;
  readonly lyricsUrl?: string;
  readonly marketplaceStatus: MarketplaceStatus;
  readonly mintingStatus: MintingStatus;
  readonly moods?: ReadonlyArray<string>;
  readonly nftName?: string;
  readonly nftPolicyId?: string;
  readonly ownerId: string;
  readonly parentalAdvisory?: string;
  readonly phonographicCopyrightOwner: string;
  readonly phonographicCopyrightYear: string;
  readonly publicationDate?: string;
  readonly releaseDate?: string;
  readonly streamUrl?: string;
  readonly title: string;
  readonly track?: number;
}

export interface PlayerState {
  readonly currentPlayingSongId?: string;
  readonly isReadyToPlay: boolean;
  readonly loadingSongId?: string;
  readonly song?: Song;
}

export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}
