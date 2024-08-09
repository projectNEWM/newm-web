/**
 * Maps RTKQuery API endpoint names with name that
 * back-end expects for recaptcha action argument.
 */
export const recaptchaEndpointActionMap: Record<string, string> = {
  appleLogin: "login_apple",
  createAccount: "signup",
  endSaleAmount: "generate_sale_end_amount",
  endSaleTransaction: "generate_sale_end_transaction",
  getADAPrice: "get_ada_price",
  getNEWMPrice: "get_newm_price",
  getSale: "get_sale",
  getSales: "get_sales",
  getStudioClientConfig: "studio_config",
  googleLogin: "login_google",
  login: "login",
  resetPassword: "password_reset",
  sendVerificationEmail: "auth_code",
  startSaleAmount: "generate_sale_start_amount",
  startSaleTransaction: "generate_sale_start_transaction",
};
