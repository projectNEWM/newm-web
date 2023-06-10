export class WalletError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "WalletError";
  }
}
