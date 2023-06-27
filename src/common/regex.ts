/**
 * Password regex, it must contain the following:
 * 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number.
 */
export const REGEX_PASSWORD_REQUIREMENTS =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

/**
 * Detect hyphens.
 */
export const REGEX_HYPHENS = /-/g;

/**
 * Retain only alphanumeric characters from a string.
 */
export const REGEX_ALPHANUMERIC = /[^a-zA-Z0-9]/g;

/**
 * Regular expression for ISRC (International Standard Recording Code) format.
 * This pattern expects two uppercase alphabetic characters followed by
 * three alphanumeric characters, two digits, and finally five digits.
 * Hyphens between each group are optional. Example: AA-AAA-00-00000
 */
export const REGEX_ISRC_FORMAT = /^[A-Z]{2}-?\w{3}-?\d{2}-?\d{5}$/g;

/**
 * Check for alphabetic characters (upper or lower case) and spaces.
 */
export const REGEX_ONLY_ALPHABETS_AND_SPACES = /^[aA-zZ\s]+$/;
