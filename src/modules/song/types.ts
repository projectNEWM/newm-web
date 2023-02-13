export interface SongState {
  songs: Array<Song>;
  artistAgreement: string;
  isLoading: boolean;
}

export type GetSongsResponse = Array<Song>;

export interface Owner {
  email: string;
  firstName: string;
  isCreator: boolean;
  isRightsOwner: boolean;
  lastName: string;
  percentage: number;
  role: string;
}

export interface UploadSongFormValues {
  readonly image?: any; // eslint-disable-line
  readonly audio?: any; // eslint-disable-line
  readonly title: string;
  readonly genre: string;
  readonly description: string;
  readonly isMinting: boolean;
  readonly largestUtxo?: number;
  readonly owners: Array<Owner>;
  readonly hasViewedAgreement: boolean;
  readonly isCreator: boolean;
  readonly agreesToContract: boolean;
}

export interface PatchSongRequest extends Partial<Song> {
  readonly image?: any; // eslint-disable-line
}

export interface UploadSongRequest {
  readonly title: string;
  readonly genre: string;
  readonly coverArtUrl: string;
  readonly description?: string;
  readonly credits?: string;
}

export interface UploadSongResponse {
  readonly songId: string;
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
  readonly title: string;
  readonly genre: string;
  readonly description?: string;
  readonly coverArtUrl?: string;
  readonly audioUrl?: string;
  readonly createdAt: string;
  readonly credits?: string;
  readonly nftPolicyId?: string;
  readonly nftName?: string;
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

export interface GenerateArtistAgreementBody {
  readonly songName: string;
  readonly companyName: string;
  readonly artistName: string;
  readonly stageName: string;
}

export interface GenerateArtistAgreementResponse {
  readonly message: string;
}
