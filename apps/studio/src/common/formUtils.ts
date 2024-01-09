import * as Yup from "yup";
import {
  REGEX_9_TO_11_DIGITS,
  REGEX_EXACTLY_12_DIGITS,
  REGEX_EXACTLY_13_DIGITS,
  REGEX_ISNI_FORMAT,
  REGEX_PASSWORD_REQUIREMENTS,
  REGEX_WEBSITE_URL,
} from "@newm-web/utils";
import { BarcodeConfig, BarcodeType } from "./types";
import {
  REGEX_EVEARA_PROHIBITED_CHARACTERS,
  REGEX_ISRC_FORMAT,
  REGEX_ISWC_FORMAT,
  REGEX_JAN_FORMAT,
  REGEX_SONG_TITLE,
} from "./regex";
import {
  MAX_CHARACTER_COUNT,
  MAX_CHARACTER_COUNT_LONG,
  MIN_DISTRIBUTION_TIME,
  NONE_OPTION,
} from "./constants";

/**
 * Returns true if all genres are included in the genre options array
 *
 * NOTE: Accounts for known Yup issue where array and elements in array
 * can be an undefined type: https://github.com/jquense/yup/issues/1853
 */
const includesGenres = (
  genreOptions: ReadonlyArray<string>,
  genres?: ReadonlyArray<string | undefined>
) => {
  // don't validate that genres array is present, this is validated separately
  if (!genres) return true;

  // return true if a genre is found to be included in genreOptions
  const hasValidGenre = !!genres.find((genre) => {
    // ignore undefined genre (see above note)
    if (!genre) return true;

    return genreOptions.includes(genre);
  });

  // return true if all genre is valid
  return hasValidGenre;
};

const BARCODE_CONFIG: Record<BarcodeType | "DEFAULT", BarcodeConfig> = {
  [BarcodeType.UPC]: {
    message: "UPC barcode must have 12 digits",
    regEx: REGEX_EXACTLY_12_DIGITS,
  },
  [BarcodeType.EAN]: {
    message: "EAN barcode must have 13 digits",
    regEx: REGEX_EXACTLY_13_DIGITS,
  },
  [BarcodeType.JAN]: {
    message: "JAN barcode must have 13 digits or less and start with 45 or 49",
    regEx: REGEX_JAN_FORMAT,
  },
  DEFAULT: {
    message: "Barcode must be 13 digits",
    regEx: REGEX_EXACTLY_13_DIGITS,
  },
};

export const getBarcodeRegex = (barcodeType: BarcodeType): BarcodeConfig => {
  return BARCODE_CONFIG[barcodeType] || BARCODE_CONFIG.DEFAULT;
};

export const commonYupValidation = {
  audio: Yup.mixed().required("This field is required"),
  barcodeNumber: Yup.string().when("barcodeType", {
    is: (barcodeType: string) => !!barcodeType && barcodeType !== NONE_OPTION,
    otherwise: Yup.string(),
    then: Yup.string()
      .test("barcodeNumberTest", function (value = "") {
        const { barcodeType } = this.parent;
        const { regEx, message } = getBarcodeRegex(barcodeType);

        return regEx.test(value) ? true : this.createError({ message });
      })
      .required("Barcode number is required when barcode type is selected"),
  }),
  barcodeType: Yup.string(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .max(
      MAX_CHARACTER_COUNT,
      `Must be ${MAX_CHARACTER_COUNT} characters or less`
    ),
  consentsToContract: Yup.bool().required("This field is required"),
  copyright: Yup.string().max(
    MAX_CHARACTER_COUNT,
    `Must be ${MAX_CHARACTER_COUNT} characters or less`
  ),
  coverArtUrl: Yup.mixed().required("This field is required"),
  creditors: (roles: string[]) =>
    Yup.array().when("isMinting", {
      is: (value: boolean) => !!value,
      then: Yup.array().test({
        message: "Creditors must have a role",
        test: (creditors = []) =>
          creditors.every(({ role }) => roles.includes(role)),
      }),
    }),
  description: Yup.string().max(
    MAX_CHARACTER_COUNT_LONG,
    `Must be ${MAX_CHARACTER_COUNT_LONG} characters or less`
  ),
  email: Yup.string()
    .email("Please enter a vaild email")
    .required("Email is required"),
  firstName: Yup.string()
    .trim()
    .max(15, "Must be 15 characters or less")
    .required("First name is required"),
  genre: (genreOptions: string[]) =>
    Yup.string().test(
      "is-genre",
      "Select a valid genre",
      // validate that genre is valid, but only if one is present
      (genre) => (genre ? genreOptions.includes(genre) : true)
    ),
  genres: (genreOptions: string[]) =>
    Yup.array(Yup.string())
      .test("is-genres", "Select a valid genre", (genre) =>
        includesGenres(genreOptions, genre)
      )
      .min(1, "At least one genre is required")
      .max(5, "Maximum of 5 genres allowed"),
  ipi: Yup.string().matches(
    REGEX_9_TO_11_DIGITS,
    "Field should contain 9 to 11 digits"
  ),
  isni: Yup.string().matches(
    REGEX_ISNI_FORMAT,
    "Invalid ISNI format. The first 15 characters are digits and the last character can be either a digit or the letter 'X'."
  ),
  isrc: (languageCodes: string[]) =>
    Yup.string()
      .matches(REGEX_ISRC_FORMAT, "This is not a valid ISRC format")
      .test("is-valid-country-code", "The country code is invalid", (value) => {
        if (!value) return true;

        const countryCode = value.substring(0, 2).toLowerCase();
        return languageCodes.includes(countryCode);
      }),
  iswc: Yup.string().matches(
    REGEX_ISWC_FORMAT,
    "Must be in the format T-000000000-0"
  ),
  lastName: Yup.string()
    .trim()
    .max(20, "Must be 20 characters or less")
    .required("Last name is required"),
  moods: Yup.array().max(5, "Maximum of 5 moods allowed"),
  newPassword: Yup.string()
    .test(
      "is-trimmed",
      "Password must not start or end with a space character",
      (password) => (password ? password === password.trim() : true)
    )
    .matches(
      REGEX_PASSWORD_REQUIREMENTS,
      "Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number"
    )
    .max(
      MAX_CHARACTER_COUNT,
      `Must be ${MAX_CHARACTER_COUNT} characters or less`
    ),
  nickname: Yup.string().max(
    MAX_CHARACTER_COUNT,
    `Must be ${MAX_CHARACTER_COUNT} characters or less`
  ),
  owners: Yup.array().when("isMinting", {
    is: (value: boolean) => !!value,
    then: Yup.array()
      .min(1, "At least one owner is required when minting")
      .test({
        message: "Owner percentages must be between 00.01% and 100%",
        test: (owners = []) =>
          owners.every(
            ({ percentage = 0 }) => percentage >= 0.01 && percentage <= 100
          ),
      })
      .test({
        message: "Percentages should not exceed 2 decimal places",
        test: (owners = []) =>
          owners.every(({ percentage = 0 }) =>
            /^\d+(\.\d{1,2})?$/.test(percentage.toString())
          ),
      })
      .test({
        message: "100% ownership must be distributed",
        test: (owners) => {
          if (!owners) return false;

          const percentageSum = owners.reduce((sum, owner) => {
            return sum + owner.percentage;
          }, 0);

          return percentageSum === 100;
        },
      }),
  }),
  password: Yup.string().required("Password is required"),
  publicationDate: Yup.date().max(new Date(), "Cannot be a future date"),
  releaseDate: (releaseDate: string | undefined) => {
    // If releaseDate is provided, use it.
    // Otherwise, use the minimum time for EVEARA to distribute from now.
    const minReleaseDate = releaseDate
      ? new Date(releaseDate)
      : new Date(Date.now() + MIN_DISTRIBUTION_TIME * 24 * 60 * 60 * 1000);

    // Yup min validation is not inclusive, subtract 1 day from release date.
    return Yup.date()
      .required("This field is required")
      .min(
        new Date(minReleaseDate.getTime() - 24 * 60 * 60 * 1000),
        `Release date must be on or after ${
          minReleaseDate.toISOString().split("T")[0]
        }`
      );
  },
  role: (roles: string[]) =>
    Yup.string()
      .required("Role is required")
      .test("is-role", "You need to type or select one", (role) =>
        role ? roles.includes(role) : false
      ),
  title: Yup.string()
    .trim()
    .required("This field is required")
    .matches(
      REGEX_EVEARA_PROHIBITED_CHARACTERS,
      "Cannot contain special characters like %,*=#<>{}~@\\/;:?$\""
    )
    .matches(REGEX_SONG_TITLE, "Cannot contain special characters")
    .max(
      MAX_CHARACTER_COUNT,
      `Must be ${MAX_CHARACTER_COUNT} characters or less`
    ),
  websiteUrl: Yup.string().matches(
    REGEX_WEBSITE_URL,
    "Please enter a valid URL"
  ),
  year: Yup.string()
    .matches(/^[0-9]+$/, "Year must only contain digits")
    .min(4, "Year must be 4 digits")
    .max(4, "Year must be 4 digits"),
};
