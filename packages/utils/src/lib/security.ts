import { RECAPTCHA_SITE_KEY } from "@newm-web/env";
import { ReCaptchaInstance, load } from "recaptcha-v3";

let recaptcha: ReCaptchaInstance | undefined;

const initializeRecaptcha = async () => {
  if (!RECAPTCHA_SITE_KEY) {
    throw new Error("Missing Recaptcha site key environment variable");
  }

  recaptcha = await load(RECAPTCHA_SITE_KEY, { autoHideBadge: true });
};

/**
 * Initializes Recaptcha if it hasn't been initialized yet
 * and returns a Recaptcha token.
 */
export const executeRecaptcha = async (action: string) => {
  if (!recaptcha) {
    await initializeRecaptcha();
  }

  if (!recaptcha) {
    throw new Error("Recaptcha failed to initialize");
  }

  return await recaptcha.execute(action);
};
