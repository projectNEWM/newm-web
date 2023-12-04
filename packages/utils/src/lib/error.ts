/**
 * An error that should not be displayed to the user (used when an error
 * occurs but the message has already been displayed to the user).
 */
export class SilentError extends Error {
  constructor(message?: string) {
    super(message);

    this.name = "SilentError";
  }
}
