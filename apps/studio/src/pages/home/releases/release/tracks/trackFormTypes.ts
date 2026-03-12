import { UploadSongThunkRequest } from "../../../../../modules/song";

export interface TrackFormValues extends UploadSongThunkRequest {
  agreesToCoverArtGuidelines?: boolean;
  primaryGenre?: string[];
  secondaryGenre?: string[];
}
