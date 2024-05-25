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
  // Cost of one unit of tokens in NEWM
  readonly costAmount: number;
  // Cost of one unit of tokens in USD
  readonly costAmountUsd: number;
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
  // url for the song artist's profile image
  readonly artistPictureUrl: string;
  // asset URL at pool.pm for studio environment or at cardanoscan.io for garage
  readonly assetUrl: string;
  // Valid URL of song audio clip file
  readonly clipUrl: string;
  // Song collaborator objects (see details below).
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
  // Valid URL of song token agreement document
  readonly tokenAgreementUrl: string;
}

export interface Collaborator {
  // UUID of the song collaborator
  readonly id: string;
  // Stage name of the song collaborator
  readonly name: string;
  // Picture url of the song collaborator
  readonly pictureUrl?: string;
  // Role of the song collaborator
  readonly role: string;
}

export interface Artist {
  // Apple Music artist profile ID.
  readonly appleMusicProfile: string;
  // Artist biography.
  readonly biography?: string;
  // Date and time when the Artist was created (ISO-8601 format).
  readonly createdAt: string;
  // Artist genre.
  readonly genre?: string;
  // UUID of the Artist.
  readonly id: string;
  // Valid URL of Artist Instagram account.
  readonly instagramUrl: string;
  // Artist location.
  readonly location: string;
  // Number of songs in NEWM Marketplace by the Artist.
  readonly marketplaceSongCount: number;
  // Stage name of the Artist.
  readonly name: string;
  // Valid URL of Artist picture image file.
  readonly pictureUrl: string;
  // Number of songs released in NEWM Studio by the Artist.
  readonly releasedSongCount: number;
  // SoundCloud artist profile permalink.
  readonly soundCloudProfile: string;
  // Spotify artist profile URI.
  readonly spotifyProfile: string;
  // Valid URL of Artist Twitter account.
  readonly twitterUrl?: string;
  // Valid URL of Artist personal website.
  readonly websiteUrl?: string;
}

export type GetSaleResponse = Sale;

export type GetSalesResponse = ReadonlyArray<GetSaleResponse>;

export type GetArtistResponse = Artist;

export type GetArtistsResponse = ReadonlyArray<Artist>;

export interface GetSalesParams {
  // List of song artist UUID's to filter results
  readonly artistIds?: ReadonlyArray<string>;
  // List of song genres to filter results
  readonly genres?: ReadonlyArray<string>;
  // List of sale UUID's to filter results
  readonly ids?: ReadonlyArray<string>;
  // Maximum number of paginated results to retrieve. Default is 25
  readonly limit?: number;
  // List of song moods to filter results
  readonly moods?: ReadonlyArray<string>;
  // ISO-8601 formated newest (minimum) timestamp to filter results
  readonly newerThan?: string;
  // Start offset of paginated results to retrieve. Default is 0
  readonly offset?: number;
  // ISO-8601 formated oldest (maximum) timestamp to filter results
  readonly olderThan?: string;
  // Case-insensitive phrase to filter by song title and artist name
  readonly phrase?: string;
  // List of song UUID's to filter results
  readonly songIds?: ReadonlyArray<string>;
  // Sort order of the results based on createdAt field. Default is asc
  readonly sortOrder?: "asc" | "desc";
  // List of sale statuses to filter results
  readonly statuses?: ReadonlyArray<string>;
}

export interface GetArtistsParams {
  // List of Artist genres for filtering results.
  readonly genres?: ReadonlyArray<string>;
  // List of Artist UUID's for filtering results.
  readonly ids?: ReadonlyArray<string>;
  // Maximum number of paginated results to retrieve. Default is 25.
  readonly limit?: number;
  // Newest (minimum) timestamp to filter-out results.
  readonly newerThan?: string;
  // Start offset of paginated results to retrieve. Default is 0.
  readonly offset?: number;
  // Oldest (maximum) timestamp to filter-out results.
  readonly olderThan?: string;
  // Sort order of the results based on createdAt field. Default is asc
  readonly sortOrder?: "asc" | "desc";
}

export interface ApiSale extends Omit<Sale, "song"> {
  readonly song: ApiSong;
}

export interface ApiSong extends Omit<Song, "isExplicit"> {
  readonly parentalAdvisory: "Explicit" | "Non-Explicit";
}
