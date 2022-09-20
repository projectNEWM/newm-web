import { load } from "recaptcha-v3";

const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

if (!siteKey) {
  throw new Error("REACT_APP_RECAPTCHA_SITE_KEY environemnt variable not set");
}

export const executeRecaptcha = async (action: string): Promise<string> => {
  const recaptcha = await load(siteKey);
  return await recaptcha.execute(action);
};
