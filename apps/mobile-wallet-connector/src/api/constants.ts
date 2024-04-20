/**
 * Maps RTKQuery API endpoint names with name that
 * back-end expects for recaptcha action argument.
 */
export const recaptchaEndpointActionMap: Record<string, string> = {
  answerChallenge: "answer_challenge",
  generateChallenge: "generate_challenge",
  getQRCode: "qrcode",
};
