// * Tentative type definition for tracks.
// TODO: to be updated with the final track type.

import { MarketplaceStatus, MintingStatus, PaymentType } from "@newm-web/types";

export interface Track {
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
  readonly earnings?: number;
  readonly genres: ReadonlyArray<string>;
  readonly id: string;
  readonly instrumental?: boolean;
  readonly ipis?: ReadonlyArray<string>;
  readonly isrc?: string;
  readonly iswc?: string;
  readonly language?: string;
  readonly lyricsUrl?: string;
  readonly marketplaceStatus: MarketplaceStatus;
  readonly mintCost?: number;
  readonly mintPaymentType?: PaymentType;
  readonly mintingStatus: MintingStatus;
  readonly moods?: ReadonlyArray<string>;
  readonly nftName?: string;
  readonly nftPolicyId?: string;
  readonly ownerId: string;
  readonly parentalAdvisory?: string;
  readonly phonographicCopyrightOwner: string;
  readonly phonographicCopyrightYear: string;
  readonly price?: string;
  readonly publicationDate?: string;
  readonly releaseDate?: string;
  readonly streamUrl?: string;
  readonly title: string;
  readonly track?: number;
}
