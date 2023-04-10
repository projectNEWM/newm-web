export interface SongState {
  artistAgreement: string;
}

export type GetSongsResponse = Array<Song>;

export interface GetSongsRequest {
  genres?: string[];
  ids?: string[];
  limit?: number;
  newerThan?: string;
  offset?: number;
  olderThan?: string;
  ownerIds?: string[];
}

export interface Owner {
  email: string;
  firstName: string;
  isCreator: boolean;
  isRightsOwner: boolean;
  lastName: string;
  percentage: number;
  role: string;
}

export interface Creditor {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface UploadSongRequest {
  readonly coverArtUrl?: string | File; // eslint-disable-line
  readonly audio?: any; // eslint-disable-line
  readonly title: string;
  readonly genres: ReadonlyArray<string>;
  readonly moods: ReadonlyArray<string>;
  readonly description: string;
  readonly isExplicit: boolean;
  readonly isMinting: boolean;
  readonly owners: Array<Owner>;
  readonly creditors: Array<Creditor>;
  readonly consentsToContract: boolean;
}

export interface UploadSongResponse {
  readonly songId: string;
}

export interface DeleteSongRequest {
  readonly songId: string;
}

export interface PatchSongRequest extends Partial<UploadSongRequest> {
  readonly id: string;
}

export interface CloudinarySignatureResponse {
  readonly signature: string;
  readonly timestamp: number;
  readonly cloudName: string;
  readonly apiKey: string;
}

export interface AudioUploadUrlRequest {
  readonly songId: string;
  readonly fileName: string;
}

export interface AudioUploadUrlResponse {
  readonly uploadUrl: string;
}

export interface Song {
  readonly id: string;
  readonly ownerId: string;
  readonly createdAt: string;
  readonly title: string;
  readonly genres: ReadonlyArray<string>;
  readonly moods: ReadonlyArray<string>;
  readonly coverArtUrl?: string;
  readonly description?: string;
  readonly credits?: string;
  readonly duration?: number;
  readonly streamUrl?: string;
  readonly nftPolicyId?: string;
  readonly nftName?: string;
  readonly mintingStatus?: string;
  readonly marketplaceStatus?: string;
}

export interface Artist {
  readonly bio: string;
  readonly name: string;
  readonly roles: string;
}

export interface Contributor {
  readonly name: string;
  readonly role: string;
  readonly stake: number;
}
