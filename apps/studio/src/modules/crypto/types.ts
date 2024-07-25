export interface GetNEWMPriceResponse {
  // NEWM token price in USD (6 decimal places). For example, a value of 1234567 means $1.234567 USD
  readonly usdPrice: number;
}

export interface GetADAPriceResponse {
  // ADA price in USD (6 decimal places). For example, a value of 1234567 means $1.234567 USD
  readonly usdPrice: number;
}
