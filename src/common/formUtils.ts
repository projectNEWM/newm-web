import * as Yup from "yup";
import { FormikValues } from "formik";

/**
 * Password regex, it must contain the following:
 * 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number.
 */
const passwordRequirementRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

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
      .test(
        "is-role",
        "You need to type or select one of the ones below",
        (role) => (role ? roles.includes(role) : false)
      ),
  genre: (genres: string[]) =>
    Yup.string().test(
      "is-genre",
      "You need to type or select one of the ones below",
      (genre) => (genre ? genres.includes(genre) : false)
    ),
  nickname: Yup.string()
    .required("Stage name is required")
    .matches(/^[aA-zZ\s]+$/, "Please only use letters"),
  password: Yup.string().required("Password is required"),
  newPassword: Yup.string()
    .test(
      "is-trimmed",
      "Password must not start or end with a space character",
      (password) => (password ? password === password.trim() : true)
    )
    .matches(
      passwordRequirementRegex,
      "Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number"
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword")],
    "Passwords must match"
  ),
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
    if (originalValues[key] !== newValues[key]) {
      updatedValues[key] = newValues[key];
    }
  });

  return updatedValues;
};
