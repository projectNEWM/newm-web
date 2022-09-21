import { useEffect } from "react";
import { ReCaptchaInstance, load } from "recaptcha-v3";

const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

if (!siteKey) {
  throw new Error("REACT_APP_RECAPTCHA_SITE_KEY environment variable not set");
}

let recaptcha: ReCaptchaInstance | undefined;

export const useInitializeRecaptcha = () => {
  useEffect(() => {
    const initializeRecaptcha = async () => {
      recaptcha = await load(siteKey);
    };

    initializeRecaptcha();
  }, []);
};

export const executeRecaptcha = async (action: string): Promise<string> => {
  if (!recaptcha) {
    throw new Error("Recaptcha instance was not initialized");
  }

  return await recaptcha.execute(action);
};
