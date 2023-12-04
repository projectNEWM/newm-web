import { SilentError } from "@newm-web/utils";

export class UploadSongError extends SilentError {
  constructor(message?: string) {
    super(message);

    this.name = "UploadSongError";
  }
}
