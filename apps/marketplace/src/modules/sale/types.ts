export interface GetOrderFeesResponse {
  // The fixed profit amount in USD added to the total order cost.
  readonly profitAmountUsd: number;
  // The service fee percentage applied to the order cost.
  readonly serviceFeePercentage: number;
}
