import { isProd } from "@newm-web/env";

/**
 * NEWM External Links and Support
 */
export const NEWM_SUPPORT_EMAIL = "support@newm.io";
export const NEWM_CLICKUP_FORM_URL =
  "https://projectnewm.atlassian.net/servicedesk/customer/portal/1";
export const NEWM_IO_URL = "https://newm.io/";
export const NEWM_STUDIO_DISCORD_URL =
  "https://discord.com/channels/931903540056694856/1153293933468713041";
export const NEWM_STUDIO_FAQ_URL = "https://newm.io/artist-faq";
export const NEWM_STUDIO_TELEGRAM_URL = "https://t.me/NEWMartists";
export const NEWM_STUDIO_TERMS_OF_SERVICE_URL = "https://newm.io/tos/";
export const NEWM_STUDIO_OUTLETS_URL = "https://newm.io/faq/#outlets";
export const NEWM_PRIVACY_POLICY_URL = "https://newm.io/privacy-policy/";
/**
 * Character count constants for form validation
 */
export const MAX_CHARACTER_COUNT = 64;
export const MAX_CHARACTER_COUNT_LONG = 250;

/**
 * Estimated minimum time, in days, for outlet distribution by EVEARA
 */
export const MIN_DISTRIBUTION_TIME = 11;

/**
 * None option for dropdowns
 */
export const NONE_OPTION = "-";

/**
 * Skip fetching invites in this list of paths
 */
export const SKIP_FETCH_INVITE_PATH_LIST = [
  "/idenfy-success-session",
  "/idenfy-fail-session",
];

export const NEWM_MARKETPLACE_URL = isProd
  ? "https://marketplace.newm.io"
  : "https://fan.square.newm.io";

export const PENDING_SALES_UPDATED_EVENT = "pendingSaleSongIdsUpdated";
export const LOCAL_STORAGE_PENDING_SALES_KEY = "pendingSaleSongIds";
