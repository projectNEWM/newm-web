import * as Yup from "yup";
import { FormikErrors, FormikValues } from "formik";
import { BarcodeConfig, BarcodeType, FieldOptions } from "./types";
import {
  REGEX_9_TO_11_DIGITS,
  REGEX_EXACTLY_12_DIGITS,
  REGEX_EXACTLY_13_DIGITS,
  REGEX_ISRC_FORMAT,
  REGEX_ISWC_FORMAT,
  REGEX_JAN_FORMAT,
  REGEX_PASSWORD_REQUIREMENTS,
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
    regEx: REGEX_EXACTLY_12_DIGITS,
    message: "UPC barcode must have 12 digits",
  },
  [BarcodeType.EAN]: {
    regEx: REGEX_EXACTLY_13_DIGITS,
    message: "EAN barcode must have 13 digits",
  },
  [BarcodeType.JAN]: {
    regEx: REGEX_JAN_FORMAT,
    message: "JAN barcode must have 13 digits or less and start with 45 or 49",
  },
  DEFAULT: {
    regEx: REGEX_EXACTLY_13_DIGITS,
    message: "Barcode must be 13 digits",
  },
};

export const getBarcodeRegex = (barcodeType: BarcodeType): BarcodeConfig => {
  return BARCODE_CONFIG[barcodeType] || BARCODE_CONFIG.DEFAULT;
};

export const commonYupValidation = {
  email: Yup.string()
    .email("Please enter a vaild email")
    .required("Email is required"),
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("First name is required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Last name is required"),
  role: (roles: string[]) =>
    Yup.string()
      .required("Role is required")
      .test("is-role", "You need to type or select one", (role) =>
        role ? roles.includes(role) : false
      ),
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
  moods: Yup.array().max(5, "Maximum of 5 moods allowed"),
  nickname: Yup.string().max(
    MAX_CHARACTER_COUNT,
    `Must be ${MAX_CHARACTER_COUNT} characters or less`
  ),
  password: Yup.string().required("Password is required"),
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .max(
      MAX_CHARACTER_COUNT,
      `Must be ${MAX_CHARACTER_COUNT} characters or less`
    ),
  coverArtUrl: Yup.mixed().required("This field is required"),
  title: Yup.string()
    .required("This field is required")
    .matches(
      /^[^%,*=#<>{}~@\\\\/;:?$"]*$/,
      "Cannot contain special characters like %,*=#<>{}~@\\/;:?$\""
    )
    .max(
      MAX_CHARACTER_COUNT,
      `Must be ${MAX_CHARACTER_COUNT} characters or less`
    ),
  description: Yup.string().max(
    MAX_CHARACTER_COUNT_LONG,
    `Must be ${MAX_CHARACTER_COUNT_LONG} characters or less`
  ),
  audio: Yup.mixed().required("This field is required"),
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
  year: Yup.string()
    .matches(/^[0-9]+$/, "Year must only contain digits")
    .min(4, "Year must be 4 digits")
    .max(4, "Year must be 4 digits"),
  copyright: Yup.string().max(
    MAX_CHARACTER_COUNT,
    `Must be ${MAX_CHARACTER_COUNT} characters or less`
  ),
  userIpi: Yup.string().matches(
    REGEX_9_TO_11_DIGITS,
    "Field should contain 9 to 11 digits"
  ),
  iswc: Yup.string().matches(
    REGEX_ISWC_FORMAT,
    "Must be in the format T-000000000-0"
  ),
  consentsToContract: Yup.bool().required("This field is required"),
  publicationDate: Yup.date().max(new Date(), "Cannot be a future date"),
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
  barcodeType: Yup.string(),
  barcodeNumber: Yup.string().when("barcodeType", {
    is: (barcodeType: string) => !!barcodeType && barcodeType !== NONE_OPTION,
    then: Yup.string()
      .test("barcodeNumberTest", function (value = "") {
        const { barcodeType } = this.parent;
        const { regEx, message } = getBarcodeRegex(barcodeType);

        return regEx.test(value) ? true : this.createError({ message });
      })
      .required("Barcode number is required when barcode type is selected"),
    otherwise: Yup.string(),
  }),
  isrc: (languageCodes: string[]) =>
    Yup.string()
      .matches(REGEX_ISRC_FORMAT, "This is not a valid ISRC format")
      .test("is-valid-country-code", "The country code is invalid", (value) => {
        if (!value) return true;

        const countryCode = value.substring(0, 2).toLowerCase();
        return languageCodes.includes(countryCode);
      }),
};

/**
 * Returns an object containing the updated values by comparing the original values with the new values.
 * If a value has been updated, the key-value pair will be included in the returned object.
 *
 * @param {FormikValues} originalValues - The original form values.
 * @param {FormikValues} newValues - The new form values.
 * @returns {Partial<FormikValues>} An object containing only the updated values.
 */
export const getUpdatedValues = (
  originalValues: FormikValues,
  newValues: FormikValues
) => {
  const updatedValues: Partial<FormikValues> = {};

  Object.keys(originalValues).forEach((key) => {
    if (
      JSON.stringify(originalValues[key]) !== JSON.stringify(newValues[key])
    ) {
      updatedValues[key] = newValues[key];
    }
  });

  return updatedValues as any; // eslint-disable-line
};

/**
 * Scrolls to the first form field with an error in the given order.
 *
 * @param {FormikErrors<unknown>} errors - Formik errors object.
 * @param {boolean} isSubmitting - Formik isSubmitting state, true if the form is currently being submitted.
 * @param {FieldOptions[]} fields - An array of FieldOptions objects.
 * Each FieldOptions object should have an 'error' property, which is the error message for that field.
 * An 'element' property, which is the actual HTML element for that field's input element.
 */
export const scrollToError = (
  errors: FormikErrors<unknown>,
  isSubmitting: boolean,
  fields: FieldOptions[]
) => {
  if (isSubmitting && Object.keys(errors).length) {
    const errorField = fields.find((field) => field.error && field.element);

    errorField?.element?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }
};
