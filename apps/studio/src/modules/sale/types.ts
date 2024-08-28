import { Currency } from "@newm-web/types";

export interface EndSaleAmountResponse {
  // CBOR format-encoded generated amount.
  readonly amountCborHex: string;
}

export interface EndSaleAmountRequest {
  // UUID of the sale.
  readonly saleId: string;
}

export interface EndSaleTransactionResponse {
  // CBOR format-encoded generated transaction.
  readonly txCborHex: string;
}

export interface EndSaleTransactionRequest {
  // Cardano wallet change address.
  readonly changeAddress: string;
  // UUID of the pending sale.
  readonly saleId: string;
  // CBOR format-encoded list of UTXOs.
  readonly utxoCborHexList: string;
}

export interface EndSaleThunkRequest extends EndSaleAmountRequest {
  readonly songId: string;
}

export interface StartSaleAmountResponse {
  // CBOR format-encoded generated amount.
  readonly amountCborHex: string;
  // UUID of the pending sale associated with the generate amount.
  // This value is ONLY useful to invoke Generate Marketplace Sale-Start Transaction.
  readonly saleId: string;
}

export interface StartSaleAmountRequest {
  // Amount of tokens in one unit of sale.
  readonly bundleAmount: number;
  // Asset Name (hex-encoded) of the bundle token.
  readonly bundleAssetName: string;
  // Policy ID of the bundle token.
  readonly bundlePolicyId: string;
  // Token amount in one unit of cost (12 decimal places for USD, 6 for NEWM).
  readonly costAmount: number;
  // Asset Name (hex-encoded) of the cost token. If missing, defaults to USD.
  readonly costAssetName?: string;
  // Policy ID of the cost token. If missing, defaults to USD.
  readonly costPolicyId?: string;
  // The owner address (typically the stake address) of the caller.
  readonly ownerAddress: string;
  // The currency type for the sale amount (USD or NEWM, defaults to USD)
  readonly saleCurrency?: string;
  // Total quantity of bundles for sale.
  readonly totalBundleQuantity: number;
}

export interface StartSaleThunkRequest
  extends Omit<StartSaleAmountRequest, "ownerAddress"> {
  readonly ownerAddress?: string;
  readonly saleCurrency: Currency;
  readonly songId: string;
}

export interface StartSaleTransactionResponse {
  // CBOR format-encoded generated transaction.
  readonly txCborHex: string;
}

export interface StartSaleTransactionRequest {
  // Cardano wallet change address.
  readonly changeAddress: string;
  // UUID of the pending sale.
  readonly saleId: string;
  // CBOR format-encoded list of UTXOs.
  readonly utxoCborHexList: string;
}
