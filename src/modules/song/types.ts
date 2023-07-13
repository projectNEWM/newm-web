import { ReactElement } from "react";

export interface SongState {
  artistAgreement: string;
}

export type GetSongsResponse = Array<Song>;

export interface GetSongStreamResponse {
  readonly song: Song;
  readonly streamData: GetSongStreamData;
}

export interface GetSongStreamData {
  readonly url: string;
}

export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

export interface GetSongsRequest {
  readonly genres?: string[];
  readonly ids?: string[];
  readonly limit?: number;
  readonly newerThan?: string;
  readonly offset?: number;
  readonly olderThan?: string;
  readonly ownerIds?: string[];
  readonly phrase?: string;
  readonly sortOrder?: SortOrder;
  readonly mintingStatuses?: MintingStatus[];
}

export interface Owner {
  id?: string;
  email: string;
  isCreator: boolean;
  isRightsOwner: boolean;
  percentage: number;
  role: string;
  status: CollaborationStatus;
}

export interface Creditor {
  id?: string;
  email: string;
  role: string;
  isCredited: boolean;
  status: CollaborationStatus;
}

export interface Featured {
  id?: string;
  email: string;
  role: string;
  isFeatured: boolean;
  status: CollaborationStatus;
}

export interface Collaborator {
  readonly email: string;
  readonly role: string;
  readonly royaltyRate?: number;
  readonly isCredited: boolean;
  readonly isFeatured: boolean;
}

/**
 * PostSong as stored in the NEWM API.
 */
export interface PostSongRequest {
  readonly title: string;
  readonly genres: ReadonlyArray<string>;
  readonly moods?: ReadonlyArray<string>;
  readonly coverArtUrl?: string;
  readonly lyricsUrl?: string;
  readonly description?: string;
  readonly album?: string;
  readonly track?: number;
  readonly language?: string;
  readonly copyrights?: string;
  readonly parentalAdvisory?: string;
  readonly barcodeType?: string;
  readonly barcodeNumber?: string;
  readonly isrc?: string;
  readonly iswc?: string;
  readonly ipis?: ReadonlyArray<string>;
  readonly releaseDate?: string;
  readonly publicationDate?: string;
}

export interface UploadSongRequest
  extends Omit<PostSongRequest, "coverArtUrl"> {
  readonly coverArtUrl?: string | File;
  readonly audio?: any; // eslint-disable-line
  readonly isExplicit: boolean;
  readonly isMinting: boolean;
  readonly owners: Array<Owner>;
  readonly creditors: Array<Creditor>;
  readonly featured: Array<Featured>;
  readonly consentsToContract: boolean;
  readonly companyName: string;
  readonly artistName: string;
  readonly stageName: string;
  readonly userIpi?: string;
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

export enum MintingStatus {
  Undistributed = "Undistributed",
  StreamTokenAgreementApproved = "StreamTokenAgreementApproved",
  MintingPaymentRequested = "MintingPaymentRequested",
  MintingPaymentReceived = "MintingPaymentReceived",
  ReadyToDistribute = "ReadyToDistribute",
  SubmittedForDistribution = "SubmittedForDistribution",
  Distributed = "Distributed",
  Declined = "Declined",
  Pending = "Pending",
  Minted = "Minted",
}

export enum MarketplaceStatus {
  Selling = "Selling",
  NotSelling = "NotSelling",
}
export interface Song {
  readonly id: string;
  readonly ownerId: string;
  readonly createdAt: string;
  readonly title: string;
  readonly genres: ReadonlyArray<string>;
  readonly moods?: ReadonlyArray<string>;
  readonly coverArtUrl?: string;
  readonly lyricsUrl?: string;
  readonly description?: string;
  readonly album?: string;
  readonly track?: number;
  readonly language?: string;
  readonly copyrights?: string;
  readonly parentalAdvisory?: string;
  readonly isrc?: string;
  readonly iswc?: string;
  readonly ipis?: ReadonlyArray<string>;
  readonly releaseDate?: string;
  readonly duration?: number;
  readonly streamUrl?: string;
  readonly nftPolicyId?: string;
  readonly nftName?: string;
  readonly mintingStatus: MintingStatus;
  readonly marketplaceStatus: MarketplaceStatus;
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
  mintingStatuses?: MintingStatus[];
}

export interface GetSongCountResponse {
  count: number;
}

export enum CollaborationStatus {
  Editing = "Editing",
  Waiting = "Waiting",
  Rejected = "Rejected",
  Accepted = "Accepted",
}

export interface GetCollaborationsRequest {
  readonly offset?: number;
  readonly limit?: number;
  readonly ids?: string;
  readonly songIds?: string;
  readonly sortOrder?: SortOrder;
  readonly emails?: string;
  readonly olderThan?: string;
  readonly newerThan?: string;
  readonly inbound?: boolean;
  readonly statuses?: CollaborationStatus[];
}

/**
 * Collaboration as stored in the NEWM API.
 */
export interface Collaboration {
  readonly id: string;
  readonly createdAt: string;
  readonly songId: string;
  readonly email: string;
  readonly role: string;
  readonly royaltyRate?: number;
  readonly credited: boolean;
  readonly featured: boolean;
  readonly status: CollaborationStatus;
}

export interface Invite {
  readonly collaborationId: string;
  readonly coverArtUrl?: string;
  readonly duration?: number;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly pictureUrl?: string;
  readonly role: string;
  readonly royaltyRate?: number;
  readonly status: CollaborationStatus;
  readonly title: string;
}

export type GetCollaborationsResponse = ReadonlyArray<Collaboration>;

export interface CreateCollaborationRequest {
  readonly songId: string;
  readonly email: string;
  readonly role: string;
  readonly royaltyRate?: number;
  readonly credited: boolean;
  readonly featured: boolean;
}

export interface UpdateCollaborationRequest
  extends Partial<CreateCollaborationRequest> {
  readonly collaborationId: string;
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
  readonly excludeMe?: boolean;
  readonly limit?: number;
  readonly offset?: number;
  readonly phrase?: string;
  readonly songIds?: string[];
  readonly sortOrder?: SortOrder;
}

export type GetCollaboratorsResponse = Array<Collaborators>;

export interface GetCollaboratorCountRequest {
  phrase?: string;
  songIds?: string[];
  excludeMe?: boolean;
}

export interface GetCollaboratorCountResponse {
  count: number;
}

export interface ReplyCollaborationRequest {
  collaborationId: string;
  accepted: boolean;
}
export interface ProcessStreamTokenAgreementRequest {
  accepted: boolean;
  songId: string;
}

export interface CreateMintSongPaymentRequest {
  readonly songId: string;
  readonly changeAddress: string;
  readonly utxoCborHexList: ReadonlyArray<string>;
}

export interface CborHexRequest {
  readonly cborHex: string;
}

export interface CborHexResponse {
  readonly cborHex: string;
}

export interface CollaboratorStatusContent {
  readonly tooltip: string;
  readonly icon: ReactElement;
}
