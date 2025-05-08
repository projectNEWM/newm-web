import { ReferralHeroObject, ReferralHeroOptinData } from "./types";

/**
 * Safely gets the ReferralHero object from window with proper typing.
 *
 * @param referralCampaignUUID - The ReferralHero Campaign UUID
 * @returns The ReferralHero object or undefined if not found
 */
function getReferralHeroObject(
  referralCampaignUUID: string
): ReferralHeroObject | undefined {
  const referralCampaignKey = `RH_${referralCampaignUUID}` as keyof Window;

  if (typeof window === "undefined") return undefined;

  return window[referralCampaignKey];
}

/**
 * Identifies a user in connection to a Referral Hero Campaign using
 * their email as the unique identifier.
 *
 * @param referralCampaignUUID - The ReferralHero Campaign UUID
 * @param email - The user's email address
 * @param force - Whether to force the identification, default is false
 * @returns void
 */
export function identifyReferralHeroUser(
  referralCampaignUUID: string,
  email: string,
  force = false
): void {
  const referralHeroObject = getReferralHeroObject(referralCampaignUUID);
  if (referralHeroObject && email) {
    referralHeroObject.identify({ email }, force);
  }
}

/**
 * Provides the user's campaign data from the Referral Hero object.
 *
 * @param referralCampaignUUID - The ReferralHero Campaign UUID
 * @returns The user's campaign data or undefined if not found
 *  */
export function getReferralHeroUserCampaignData(
  referralCampaignUUID: string
): ReferralHeroOptinData | undefined {
  const referralHeroObject = getReferralHeroObject(referralCampaignUUID);
  if (referralHeroObject && referralHeroObject.optin_data) {
    return referralHeroObject.optin_data;
  }
  return undefined;
}
