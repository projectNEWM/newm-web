export interface GetAdaUsdConversionResponse {
  // ADA price in USD (6 decimal places), e.g a value of 1234567 means $1.234567 USD
  readonly usdPrice: number;
}

export interface GetNewmUsdConversionResponse {
  // NEWM price in USD (6 decimal places), e.g a value of 1234567 means $1.234567 USD
  readonly usdPrice: number;
}
