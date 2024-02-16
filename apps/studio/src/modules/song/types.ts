import { MintingStatus, Song, SortOrder } from "@newm-web/types";
import { OnUploadProgress } from "../../api/types";

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

export interface GetSongsRequest {
  readonly genres?: string[];
  readonly ids?: string[];
  readonly limit?: number;
  readonly mintingStatuses?: MintingStatus[];
  readonly newerThan?: string;
  readonly offset?: number;
  readonly olderThan?: string;
  readonly ownerIds?: string[];
  readonly phrase?: string;
  readonly sortOrder?: SortOrder;
}

export interface Owner {
  email: string;
  id?: string;
  isCreator: boolean;
  isRightsOwner: boolean;
  percentage: number;
  role: string;
  status: CollaborationStatus;
}

export interface Creditor {
  email: string;
  id?: string;
  isCredited: boolean;
  role: string;
  status: CollaborationStatus;
}

export interface Featured {
  email: string;
  id?: string;
  isFeatured: boolean;
  role: string;
  status: CollaborationStatus;
}

export interface Collaborator {
  readonly email: string;
  readonly isCredited: boolean;
  readonly isFeatured: boolean;
  readonly role: string;
  readonly royaltyRate?: number;
}

/**
 * PostSong as stored in the NEWM API.
 */
export interface PostSongRequest {
  readonly album?: string;
  readonly barcodeNumber?: string;
  readonly barcodeType?: string;
  readonly compositionCopyrightOwner?: string;
  readonly compositionCopyrightYear?: string;
  readonly coverArtUrl?: string;
  readonly coverRemixSample?: boolean;
  readonly description?: string;
  readonly genres: ReadonlyArray<string>;
  readonly ipis?: ReadonlyArray<string>;
  readonly isrc?: string;
  readonly iswc?: string;
  readonly language?: string;
  readonly lyricsUrl?: string;
  readonly moods?: ReadonlyArray<string>;
  readonly parentalAdvisory?: string;
  readonly phonographicCopyrightOwner?: string;
  readonly phonographicCopyrightYear?: string;
  readonly publicationDate?: string;
  readonly releaseDate?: string;
  readonly title: string;
  readonly track?: number;
}

export interface UploadSongRequest
  extends Omit<PostSongRequest, "coverArtUrl"> {
  readonly artistName: string;
  readonly audio?: any;
  readonly companyName: string;
  readonly consentsToContract: boolean;
  readonly coverArtUrl?: string | File;
  readonly creditors: Array<Creditor>;
  readonly featured: Array<Featured>;
  readonly ipi?: string;
  readonly isCoverRemixSample?: boolean;
  // eslint-disable-line
  readonly isExplicit: boolean;
  readonly isMinting: boolean;
  readonly owners: Array<Owner>;
  readonly stageName: string;
}

export interface UploadSongResponse {
  readonly songId: string;
}

export interface UploadSongAudioRequest {
  readonly audio: File;
  readonly onUploadProgress?: OnUploadProgress;
  readonly songId: string;
}

export interface UploadSongAudioResponse {
  readonly duration: number;
  readonly fileSize: number;
  readonly mimeType: string;
  readonly sampleRate: number;
  readonly url: string;
}

export interface DeleteSongRequest {
  readonly archived?: boolean;
  readonly showToast?: boolean;
  readonly songId: string;
}

export interface PatchSongRequest extends Partial<UploadSongRequest> {
  readonly id: string;
  readonly shouldRedirect?: boolean;
}

export interface UpdateCollaborationsRequest {
  readonly creditors: ReadonlyArray<Creditor>;
  readonly featured: ReadonlyArray<Featured>;
  readonly id: string;
  readonly owners: ReadonlyArray<Owner>;
}

export interface CloudinarySignatureResponse {
  readonly apiKey: string;
  readonly cloudName: string;
  readonly signature: string;
  readonly timestamp: number;
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

export interface GetSongCountRequest {
  genres?: string[];
  ids?: string[];
  mintingStatuses?: MintingStatus[];
  moods?: string[];
  newerThan?: string;
  olderThan?: string;
  ownerIds?: string[];
  phrase?: string;
}

export interface GetSongCountResponse {
  count: number;
}

export enum CollaborationStatus {
  Accepted = "Accepted",
  Editing = "Editing",
  Rejected = "Rejected",
  Waiting = "Waiting",
}

export interface GetCollaborationsRequest {
  readonly emails?: string;
  readonly ids?: string[];
  readonly inbound?: boolean;
  readonly limit?: number;
  readonly newerThan?: string;
  readonly offset?: number;
  readonly olderThan?: string;
  readonly songIds?: string;
  readonly sortOrder?: SortOrder;
  readonly statuses?: CollaborationStatus[];
}

/**
 * Collaboration as stored in the NEWM API.
 */
export interface Collaboration {
  readonly createdAt: string;
  readonly credited: boolean;
  readonly email: string;
  readonly featured: boolean;
  readonly id: string;
  readonly role: string;
  readonly royaltyRate?: number;
  readonly songId: string;
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
  readonly credited: boolean;
  readonly email: string;
  readonly featured: boolean;
  readonly role: string;
  readonly royaltyRate?: number;
  readonly songId: string;
}

export interface UpdateCollaborationRequest
  extends Partial<CreateCollaborationRequest> {
  readonly collaborationId: string;
}

export interface CreateCollaborationResponse {
  readonly collaborationId: string;
}

export interface CollaboratorInfo {
  biography?: string;
  createdAt?: string;
  email?: string;
  firstName?: string;
  genre?: string;
  id?: string;
  lastName?: string;
  pictureUrl?: string;
  role?: string;
  walletAddress?: string;
}

export interface Collaborators {
  email: string;
  songCount: number;
  user?: CollaboratorInfo;
}

export interface GetCollaboratorsRequest {
  readonly emails?: string[];
  readonly excludeMe?: boolean;
  readonly limit?: number;
  readonly offset?: number;
  readonly phrase?: string;
  readonly songIds?: string[];
  readonly sortOrder?: SortOrder;
}

export type GetCollaboratorsResponse = Array<Collaborators>;

export interface GetCollaboratorCountRequest {
  excludeMe?: boolean;
  phrase?: string;
  songIds?: string[];
}

export interface GetCollaboratorCountResponse {
  count: number;
}

export interface ReplyCollaborationRequest {
  accepted: boolean;
  collaborationId: string;
}
export interface ProcessStreamTokenAgreementRequest {
  accepted: boolean;
  songId: string;
}

export interface CreateMintSongPaymentRequest {
  readonly changeAddress: string;
  readonly songId: string;
  readonly utxoCborHexList: ReadonlyArray<string>;
}

export interface SubmitTransactionRequest {
  readonly cborHex: string;
  readonly songId: string;
}

export interface CborHexResponse {
  readonly cborHex: string;
}

export interface GetEarliestReleaseDateResponse {
  readonly date: string;
}

export interface GetUserWalletSongsRequest {
  readonly limit?: number;
  readonly offset?: number;
  readonly sortOrder?: SortOrder;
  readonly utxoCborHexList: ReadonlyArray<string>;
}

interface WalletSong {
  readonly song: Song;
  readonly token_amount: number;
}

export interface GetUserWalletSongsResponse {
  readonly limit: number;
  readonly offset: number;
  readonly songs: WalletSong[];
  readonly total: number;
}

export interface GetMintSongEstimateRequest {
  readonly collaborators: number;
}

export interface GetMintSongEstimateResponse {
  readonly adaPrice: string;
  readonly cborHex: string;
  readonly collabPerArtistPriceAda: string;
  readonly collabPerArtistPriceUsd: string;
  readonly collabPriceAda: string;
  readonly collabPriceUsd: string;
  readonly dspPriceAda: string;
  readonly dspPriceUsd: string;
  readonly mintPriceAda: string;
  readonly mintPriceUsd: string;
  readonly usdAdaExchangeRate: string;
  readonly usdPrice: string;
}
