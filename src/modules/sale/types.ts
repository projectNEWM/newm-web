export enum PaymentType {
  Wallet = "wallet",
  Manual = "manual",
}

export enum PurchaseStatus {
  Pending = "pending",
  Processing = "processing",
  Completed = "completed",
  Timeout = "timeout",
}

export interface SaleState {
  sales: Array<SaleBundle>;
  purchaseOrder?: PurchaseOrder;
  paymentType?: PaymentType;
  purchaseStatus?: PurchaseStatus;
  isTransactionCreated: boolean;
}

export interface SaleBundle {
  readonly id: number;
  readonly cost: number;
  readonly tokenCostType: string | null;
  readonly tokenCost: number | null;
  readonly startDate: string;
  readonly endDate: string | null;
  readonly dripCampaigns: Array<string> | null;
}

export interface FeaturedSaleBundles {
  ftSaleBundles: Array<SaleBundle>;
}

export interface SaleBundlesResponse {
  readonly status: string;
  readonly message: string | null;
  readonly data: [string, FeaturedSaleBundles];
}

export interface PurchaseOrder {
  readonly purchaseId: number;
  readonly paymentAddress: string;
  readonly cost: string;
  readonly timeout: number;
  readonly tokenAmount: number | null;
  readonly tokenCosts: Array<number> | null;
}

export interface PurchaseOrderResponse {
  readonly status: string;
  readonly message: string | null;
  readonly data: [string, PurchaseOrder];
}

export interface PurchaseOrderRequest {
  readonly projectId: number;
  readonly bundleId: number;
  readonly receiveAddress: string;
  readonly paymentType: PaymentType;
}

export interface PurchaseStatusBody {
  readonly status: PurchaseStatus;
}

export interface PurchaseStatusResponse {
  readonly status: string;
  readonly message: string | null;
  readonly data: [string, PurchaseStatusBody];
}
