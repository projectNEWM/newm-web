/**
 * Maps RTKQuery API endpoint names with name that
 * back-end expects for recaptcha action argument.
 */
export const recaptchaEndpointActionMap: Record<string, string> = {
  generateOrder: "generate_order_amount",
  generateTransaction: "generate_order_transaction",
  getAdaUsdConversionRate: "get_ada_price",
  getArtist: "get_artist",
  getArtistCount: "get_artist_count",
  getArtists: "get_artists",
  getEarnings: "get_earnings",
  getMarketplaceClientConfig: "marketplace_config",
  getNewmUsdConversionRate: "get_newm_price",
  getSale: "get_sale",
  getSaleCount: "get_sale_count",
  getSales: "get_sales",
  postEarnings: "post_earnings",
};
