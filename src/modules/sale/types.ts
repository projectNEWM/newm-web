export interface SaleState {
  sales: Array<SaleBundle>;
}

export interface SaleBundle {
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

export interface SaleBundlesResp {
  readonly status: string;
  readonly message: string | null;
  readonly data: [string, FeaturedSaleBundles];
}
