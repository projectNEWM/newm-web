/**
 * Maps RTKQuery API endpoint names with action name
 * that back-end expects for recaptcha action argument.
 */
export const recaptchaEndpointActionMap: Record<string, string> = {
  appleLogin: "login_apple",
  createAccount: "signup",
  googleLogin: "login_google",
  login: "login",
  resetPassword: "password_reset",
  sendVerificationEmail: "auth_code",
};
