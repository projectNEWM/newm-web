/**
 * Password regex, it must contain the following:
 * 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number.
 */
export const REGEX_PASSWORD_REQUIREMENTS =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

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

export const REGEX_9_TO_11_DIGITS = /^\d{9,11}$/;
export const REGEX_EXACTLY_12_DIGITS = /^\d{12}$/;
export const REGEX_EXACTLY_13_DIGITS = /^\d{13}$/;

/**
 * Check for alphabetic characters (upper or lower case) and spaces.
 */
export const REGEX_ONLY_ALPHABETS_AND_SPACES = /^[aA-zZ\s]+$/;

/**
 * Matches a valid Spotify artist profile URI format.
 * It begins with the string 'spotify:artist:', followed by one or more alphanumeric characters.
 * For example, it would match "spotify:artist:4FemUzxZW18iLloqkxi1p".
 */
export const REGEX_SPOTIFY_PROFILE = /^spotify:artist:[a-zA-Z0-9]+$/;

/**
 * Matches a valid numeric Apple Music artist profile ID.
 * It captures one or more numeric digits.
 * For example, it would match "123456" from a URL like "music.apple.com/us/artist/john-doe/123456".
 */
export const REGEX_APPLE_MUSIC_PROFILE = /^\d+$/;

/**
 * Matches a valid SoundCloud artist profile name.
 * The profile name can contain lowercase letters, numbers, underscores, and hyphens.
 * For example, it would match "yourSoundCloudArtistName" or "artist-name_123".
 */
export const REGEX_SOUNDCLOUD_PROFILE = /^[0-9a-z_-]+$/;

/**
 * Matches a valid website URL including the case that http, https, or www are not provided.
 */
export const REGEX_WEBSITE_URL =
  /^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9@:%._+~#=-]+\.[a-z]+\b([a-zA-Z0-9@:%_+~#?&/=.-]*)$/;
