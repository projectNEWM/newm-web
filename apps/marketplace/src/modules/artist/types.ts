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

export type GetArtistResponse = Artist;

export type GetArtistsResponse = ReadonlyArray<Artist>;

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
