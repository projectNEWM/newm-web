export interface SaleBundlesResp {
  readonly cost: number;
  readonly tokenCostType: string | null;
  readonly tokenCost: number | null;
  readonly startDate: string;
  readonly endDate: string | null;
  readonly dripCampaigns: ReadonlyArray<string> | null;
}
