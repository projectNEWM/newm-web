/**
 * Regular expression for ISRC (International Standard Recording Code) format.
 * This pattern expects two uppercase alphabetic characters followed by
 * three alphanumeric characters, two digits, and finally five digits.
 * Hyphens between each group are optional. Example: AA-AAA-00-00000
 */
export const REGEX_ISRC_FORMAT = /^[A-Z]{2}-?\w{3}-?\d{2}-?\d{5}$/g;

/**
 * Regular expression for International Standard Musical Work Code (ISWC) format.
 * An ISWC begins with the letter "T", followed by a hyphen, nine unique digits (from 000000001 to 999999999),
 * another hyphen, and a check digit at the end.
 * Example of a valid ISWC: T-345246800-1
 */
export const REGEX_ISWC_FORMAT = /^T-\d{9}-\d$/g;

/**
 * Regular expression for Japanese Article Number (JAN) format.
 * The JAN barcode must start with either "49" or "45" and can be followed
 * by up to 11 additional numeric digits, making it a total of 13 digits or less.
 */
export const REGEX_JAN_FORMAT = /^(49|45)\d{1,11}$/;

/**
 * Regular expression to match URLs with the specified domain followed by a path.
 */
const generateRegexForDomainWithPath = (domain: string): RegExp => {
  return new RegExp(`${domain}/.+`, "i");
};

export const REGEX_SPOTIFY_PROFILE =
  generateRegexForDomainWithPath("open.spotify.com");
export const REGEX_APPLE_MUSIC_PROFILE =
  generateRegexForDomainWithPath("music.apple.com");
export const REGEX_SOUNDCLOUD_PROFILE =
  generateRegexForDomainWithPath("soundcloud.com");

/**
 * Matches strings containing alphanumeric characters (both lower and uppercase),
 * spaces, and most ASCII punctuation characters. It excludes some special characters like `%,*,=#<>{}~@\\/;:?$"`.
 * Main purpose is to prevent emojis.
 *
 * - `\w`: Matches any word character (alphanumeric + underscore).
 * - `\s`: Matches any whitespace character (spaces, tabs, line breaks).
 * - `!-/:-@[-``{-~`: Matches most ASCII punctuation characters.
 */
export const REGEX_SONG_TITLE = /^[\w\s!-/:-@[-`{-~]*$/;

/**
 * A regular expression pattern that matches strings excluding specific special characters
 * like %,*=#<>{}~@\\/;:?$".
 *
 * The pattern breaks down as follows:
 *
 * - `^`: Asserts position at start of a line.
 * - `[^%,*=#<>{}~@\\\\/;:?$"]`: Matches any character that is not in this character set.
 * - `*`: Matches the previous token (the character set) between zero and unlimited times.
 * - `$`: Asserts position at end of a line.
 */
export const REGEX_EVEARA_PROHIBITED_CHARACTERS = /^[^%,*=#<>{}~@\\\\/;:?$"]*$/;
