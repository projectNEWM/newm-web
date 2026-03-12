import { isProd } from "@newm-web/env";

/**
 * NEWM External Links and Support
 */
export const NEWM_SUPPORT_EMAIL = "support@newm.io";
export const NEWM_SUPPORT_LINK =
  "https://projectnewm.atlassian.net/servicedesk/customer/portals";
export const NEWM_CLICKUP_FORM_URL =
  "https://projectnewm.atlassian.net/servicedesk/customer/portal/1";
export const NEWM_IO_URL = "https://newm.io/";
export const NEWM_STUDIO_OFFICIAL_STATEMENT_URL = `${NEWM_IO_URL}sunset/`;
export const NEWM_STUDIO_DISCORD_URL =
  "https://discord.com/channels/931903540056694856/1153293933468713041";
export const NEWM_STUDIO_FAQ_URL = "https://newm.io/artist-faq";
export const NEWM_STUDIO_COPYRIGHT_FAQ_URL = `${NEWM_STUDIO_FAQ_URL}/#copyrights`;
export const NEWM_STUDIO_TELEGRAM_URL = "https://t.me/NEWMartists";
export const NEWM_STUDIO_OUTLETS_URL = "https://newm.io/artist-faq/#outlets";
export const NEWM_PRIVACY_POLICY_URL = "https://newm.io/privacy-policy/";
/**
 * Character count constants for form validation
 */
export const OFFICIAL_NAME_MAX_CHARACTER_COUNT = 50;
export const MAX_CHARACTER_COUNT = 64;
export const SONG_DESCRIPTION_MAX_CHARACTER_COUNT = 120;
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
  "/paypal-loading-session",
  "/paypal-cancelled-session",
  "/paypal-success-session",
];

export const NEWM_MARKETPLACE_URL = isProd
  ? "https://marketplace.newm.io"
  : "https://fan.square.newm.io";

export const LOCAL_STORAGE_SALE_START_PENDING_KEY = "saleStartSongs";
export const SALE_START_UPDATED_EVENT = "saleStartUpdated";

export const LOCAL_STORAGE_SALE_END_PENDING_KEY = "saleEndSongIds";
export const SALE_END_UPDATED_EVENT = "saleEndUpdated";

export const LOCAL_STORAGE_SALE_COMPLETE_PENDING_KEY = "saleCompleteSongIds";
export const SALE_COMPLETE_UPDATED_EVENT = "saleCompleteUpdated";

/**
 * Stream token sale default bundle amount
 */
export const SALE_DEFAULT_BUNDLE_AMOUNT = 1;

// * KEPT FOR BACKWARDS COMPATIBILITY --- REMOVE ONCE FULLY MIGRATED TO RELEASES & TRACKS.
export const FIELDS_TOOLTIP_COPY_TEXT = {
  instrumental: `Tracks without vocals or lyrics should be indicated as an instrumental.
   Failure to accurately label the track could result in a declined distribution submission.`,

  originalReleaseDate: `If your release has already been distributed on other platforms,
     you may input the original release date here, but it's not required.`,

  releaseCodeNumber: `A release code number is a unique code that identifies your release.
   If you do not already have one, leave this field blank,
    and a new release code number will be auto-generated for you.`,

  releaseCodeType: `If you already have a release code, 
  select the code type here and enter the code in the next field. If not, 
  leave this field blank and a new release code will be auto-generated for you.`,

  releaseDate: `When setting a release date, remember to factor in approval
    from any collaborators and/or featured artists, as well as quality assurance checks,
    which can take up to 15 days.`,
} as const;
