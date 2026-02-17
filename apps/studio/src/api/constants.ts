/**
 * Maps RTKQuery API endpoint names with name that
 * back-end expects for recaptcha action argument.
 */
export const recaptchaEndpointActionMap: Record<string, string> = {
  appleLogin: "login_apple",
  createAccount: "signup",
  endSaleAmount: "generate_sale_end_amount",
  endSaleTransaction: "generate_sale_end_transaction",
  getAdaUsdConversionRate: "get_ada_price",
  getEarnings: "get_earnings",
  getNewmUsdConversionRate: "get_newm_price",
  getSale: "get_sale",
  getSaleCount: "get_sale_count",
  getSales: "get_sales",
  getStudioClientConfig: "studio_config",
  googleLogin: "login_google",
  login: "login",
  postEarnings: "post_earnings",
  resetPassword: "password_reset",
  sendVerificationEmail: "auth_code",
  startSaleAmount: "generate_sale_start_amount",
  startSaleTransaction: "generate_sale_start_transaction",
};
