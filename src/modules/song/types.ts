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
  phrase?: string;
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

export interface Collaborator {
  readonly email: string;
  readonly role?: string;
  readonly royaltyRate?: number;
  readonly isCredited: boolean;
}

export interface UploadSongRequest {
  readonly coverArtUrl?: string | File; // eslint-disable-line
  readonly audio?: any; // eslint-disable-line
  readonly title: string;
  readonly genres: ReadonlyArray<string>;
  readonly moods?: ReadonlyArray<string>;
  readonly description: string;
  readonly isExplicit: boolean;
  readonly isMinting: boolean;
  readonly owners: Array<Owner>;
  readonly creditors: Array<Creditor>;
  readonly consentsToContract: boolean;
  readonly companyName: string;
  readonly artistName: string;
  readonly stageName: string;
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
  readonly url: string;
  readonly fields: Record<string, string>;
}

export type MintingStatus =
  | "Undistributed"
  | "StreamTokenAgreementApproved"
  | "MintingPaymentRequested"
  | "MintingPaymentReceived"
  | "ReadyToDistribute"
  | "SubmittedForDistribution"
  | "Distributed"
  | "Declined"
  | "Pending"
  | "Minted";

export interface Song {
  readonly id: string;
  readonly ownerId: string;
  readonly createdAt: string;
  readonly title: string;
  readonly genres: ReadonlyArray<string>;
  readonly moods?: ReadonlyArray<string>;
  readonly coverArtUrl?: string;
  readonly description?: string;
  readonly credits?: string;
  readonly duration?: number;
  readonly streamUrl?: string;
  readonly nftPolicyId?: string;
  readonly nftName?: string;
  readonly mintingStatus: MintingStatus;
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

export interface UseHlsJsParams {
  readonly onPlaySong?: (song: Song) => void;
  readonly onStopSong?: (song?: Song) => void;
  readonly onSongEnded?: (event: Event) => any; // eslint-disable-line
}

export interface UseHlsJsResult {
  readonly playSong: (song: Song) => void;
  readonly stopSong: (song?: Song) => void;
}

export interface GetSongCountRequest {
  phrase?: string;
  ids?: string[];
  ownerIds?: string[];
  genres?: string[];
  moods?: string[];
  olderThan?: string;
  newerThan?: string;
}

export interface GetSongCountResponse {
  count: number;
}

export enum CollaborationAcceptedStatus {
  Editing = "Editing",
  Waiting = "Waiting",
  Rejected = "Rejected",
  Accepted = "Accepted,",
}

export interface GetCollaborationsRequest {
  readonly offset?: number;
  readonly limit?: number;
  readonly ids?: string;
  readonly songIds?: string;
  readonly emails?: string;
  readonly olderThan?: string;
  readonly newerThan?: string;
}

export interface Collaboration {
  readonly id: string;
  readonly createdAt: string;
  readonly songId: string;
  readonly email: string;
  readonly role?: string;
  readonly royaltyRate?: string;
  readonly credited: boolean;
  readonly accepted: CollaborationAcceptedStatus;
}

export type GetCollaborationsResponse = ReadonlyArray<Collaboration>;

export interface CreateCollaborationRequest {
  readonly songId: string;
  readonly email: string;
  readonly role?: string;
  readonly royaltyRate?: number;
  readonly credited: boolean;
}

export interface CreateCollaborationResponse {
  readonly collaborationId: string;
}

export interface CollaboratorInfo {
  id?: string;
  createdAt?: string;
  firstName?: string;
  lastName?: string;
  pictureUrl?: string;
  role?: string;
  genre?: string;
  biography?: string;
  walletAddress?: string;
  email?: string;
}

export interface Collaborators {
  email: string;
  songCount: number;
  user?: CollaboratorInfo;
}

export interface GetCollaboratorsRequest {
  limit?: number;
  offset?: number;
  phrase?: string;
  songIds?: string[];
}

export type GetCollaboratorsResponse = Array<Collaborators>;

export interface GetCollaboratorCountRequest {
  phrase?: string;
  songIds?: string[];
}

export interface GetCollaboratorCountResponse {
  count: number;
}
