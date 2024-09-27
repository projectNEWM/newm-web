/**
 * Maps RTKQuery API endpoint names with name that
 * back-end expects for recaptcha action argument.
 */
export const recaptchaEndpointActionMap: Record<string, string> = {
  generateOrder: "generate_order_amount",
  generateTransaction: "generate_order_transaction",
  getAdaUsdConversionRate: "get_ada_price",
  getArtist: "get_artist",
  getArtists: "get_artists",
  getArtistsCount: "get_artist_count",
  getMarketplaceClientConfig: "marketplace_config",
  getNewmUsdConversionRate: "get_newm_price",
  getSale: "get_sale",
  getSales: "get_sales",
  getSalesCount: "get_sale_count",
};
