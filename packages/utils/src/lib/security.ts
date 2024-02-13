import { RECAPTCHA_SITE_KEY } from "@newm-web/env";
import { ReCaptchaInstance, load } from "recaptcha-v3";

let recaptcha: ReCaptchaInstance | undefined;

/**
 * Initializes recaptcha if it hasn't been initialized yet
 * and returns a recaptcha token.
 */
export const executeRecaptcha = async (action: string) => {
  if (!RECAPTCHA_SITE_KEY) {
    throw new Error("Missing Recaptcha site key environment variable");
  }

  if (!recaptcha) {
    recaptcha = await load(RECAPTCHA_SITE_KEY, { autoHideBadge: true });
  }

  return await recaptcha.execute(action);
};
