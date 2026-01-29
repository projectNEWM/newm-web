import { UploadSongThunkRequest } from "../../../../../modules/song";

export interface TrackFormValues extends UploadSongThunkRequest {
  agreesToCoverArtGuidelines?: boolean;
}
