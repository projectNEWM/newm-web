export enum SaleStatus {
  Ended = "Ended",
  SoldOut = "SoldOut",
  Started = "Started",
}

export interface SaleState {
  readonly sales: ReadonlyArray<Sale>;
}

export interface Sale {
  // Available quantity of bundles for sale
  readonly availableBundleQuantity: number;
  // Amount of tokens in one unit of sale
  readonly bundleAmount: number;
  // Asset Name (hex-encoded) of the bundle token
  readonly bundleAssetName: string;
  // Policy ID of the bundle token
  readonly bundlePolicyId: string;
  // Amount of tokens in one unit of cost
  readonly costAmount: number;
  // Asset Name (hex-encoded) of the cost token
  readonly costAssetName: string;
  // Policy ID of the cost token
  readonly costPolicyId: string;
  // Date and time when the Song was created (ISO-8601 format)
  readonly createdAt: string;
  // UUID of the sale
  readonly id: string;
  // Maximum bundle size allowed
  readonly maxBundleSize: number;
  // The song associated with the sale
  readonly song: Song;
  // Sale status. Valid valid values are: Started, SoldOut & Ended
  readonly status: SaleStatus;
  // Total quantity of bundles originally for sale
  readonly totalBundleQuantity: number;
}

export interface Song {
  // UUID of the song artist
  readonly artistId: string;
  // Stage name of the song artist
  readonly artistName: string;
  // Valid URL of song audio clip file
  readonly clipUrl: string;
  // Song collaborator objects (see details bellow).	Always
  readonly collaborators: ReadonlyArray<Collaborator>;
  // Valid URL of cover art picture file
  readonly coverArtUrl: string;
  // Song description
  readonly description: string;
  //Song genres
  readonly genres: ReadonlyArray<string>;
  // UUID of the Song
  readonly id: string;
  // Whether the song contains explicit lyrics
  readonly isExplicit: boolean;
  // Song moods
  readonly moods: ReadonlyArray<string>;
  // Song title
  readonly title: string;
  // Valid URL of song token agreetment document
  readonly tokenAgreementUrl: string;
}

export interface Collaborator {
  // UUID of the song collaborator
  readonly id: string;
  // Stage name of the song collaborator
  readonly name: string;
  // Role of the song collaborator
  readonly role: string;
}

export type SaleResponse = Sale;

export type SalesResponse = ReadonlyArray<SaleResponse>;
