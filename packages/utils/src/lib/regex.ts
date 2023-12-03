/**
 * Password regex, it must contain the following:
 * 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number.
 */
export const REGEX_PASSWORD_REQUIREMENTS =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

/**
 * Check for alphabetic characters (upper or lower case) and spaces.
 */
export const REGEX_ONLY_ALPHABETS_AND_SPACES = /^[aA-zZ\s]+$/;

export const REGEX_9_TO_11_DIGITS = /^\d{9,11}$/;
export const REGEX_EXACTLY_12_DIGITS = /^\d{12}$/;
export const REGEX_EXACTLY_13_DIGITS = /^\d{13}$/;

/**
 * Regular expression to match URLs in the format of "domain.whatever" with
 * optional "http://" or "https://" prefixes and potential subdomains.
 * This ignores paths after the domain.
 *
 * @example
 * - domain.com
 * - https://domain.org
 * - http://sub.domain.net
 */
export const REGEX_SIMPLE_DOMAIN = /([a-z0-9-]+\.[a-z]+)/i;

/**
 * Matches a valid website URL including the case that http, https, or www are not provided.
 */
export const REGEX_WEBSITE_URL =
  /^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9@:%._+~#=-]+\.[a-z]+\b([a-zA-Z0-9@:%_+~#?&/=.-]*)$/;
