/**
 * Maps RTKQuery API endpoint names with name that
 * back-end expects for recaptcha action argument.
 */
export const recaptchaEndpointActionMap: Record<string, string> = {
  generateOrder: "generate_order_amount",
  generateTransaction: "generate_order_transaction",
  getArtist: "get_artist",
  getArtists: "get_artists",
  getSale: "get_sale",
  getSales: "get_sales",
};
