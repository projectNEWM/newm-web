import { FunctionComponent } from "react";
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { Button, HorizontalLine } from "@newm-web/elements";
import { PasswordInputField } from "@newm-web/elements";
import { getUpdatedValues } from "@newm-web/utils";
import { useWindowDimensions } from "@newm-web/utils";
import * as Yup from "yup";
import theme from "@newm-web/theme";
import DeleteAccountDialog from "./DeleteAccountDialog";
import {
  ChangePasswordRequest,
  emptyProfile,
  useChangePasswordThunk,
  useGetProfileQuery,
} from "../../../modules/session";
import {
  NEWM_STUDIO_TERMS_OF_SERVICE_URL,
  commonYupValidation,
} from "../../../common";
import { LogoutButton } from "../../../components";

const Settings: FunctionComponent = () => {
  const windowWidth = useWindowDimensions()?.width;

  const {
    data: { oauthType } = emptyProfile,
    isLoading: isGetUserProfileLoading,
  } = useGetProfileQuery();
  const isSocialLogin = !!oauthType;
  const [changePassword, { isLoading }] = useChangePasswordThunk();

  const initialValues: ChangePasswordRequest = {
    confirmPassword: "",
    currentPassword: "",
    newPassword: "",
  };

  /**
   * If there is a current password, the new password is required and it can't be the same as the current password.
   */
  const newPassword = commonYupValidation.newPassword.when("currentPassword", {
    is: (currentValue: string) => currentValue,
    then: Yup.string()
      .required("New password is required")
      .notOneOf(
        [Yup.ref("currentPassword")],
        "New password cannot be the same as the current password"
      ),
  });

  /**
   * If there is a new password, the confirmation password is required and it has to match the new password.
   */
  const confirmPassword = commonYupValidation.confirmPassword.when(
    "newPassword",
    {
      is: (currentValue: string) => currentValue,
      then: Yup.string().required("Must match new password"),
    }
  );

  /**
   * Defines the validation schema based on the user's login method.
   * If the user is logged in using social login, only the new password and the confirmation password are required.
   * If the user logged in using email and password, the current password is also required.
   */
  const validationSchema = isSocialLogin
    ? Yup.object({
        confirmPassword,
        newPassword: commonYupValidation.newPassword.required(
          "New password is required"
        ),
      })
    : Yup.object({
        confirmPassword,
        currentPassword: Yup.string().required("Current password is required"),
        newPassword,
      });

  /**
   * Update profile data with modifications made.
   */
  const handleSubmit = (
    values: ChangePasswordRequest,
    { resetForm }: FormikHelpers<ChangePasswordRequest>
  ) => {
    const updatedValues = getUpdatedValues(initialValues, values);
    changePassword({ ...updatedValues });
    resetForm();
  };

  return (
    <Container
      maxWidth={ false }
      sx={ {
        marginX: [null, null, 3],
        overflow: "auto",
        paddingBottom: 8,
        textAlign: ["center", "center", "initial"],
      } }
    >
      <Stack direction="row" justifyContent="space-between" mb={ 8 }>
        <Typography fontWeight={ 800 } variant="h3">
          SETTINGS
        </Typography>{ " " }
        <Stack>
          <LogoutButton />
        </Stack>
      </Stack>

      <Formik
        enableReinitialize={ true }
        initialValues={ initialValues }
        validationSchema={ validationSchema }
        onSubmit={ handleSubmit }
      >
        { ({
          dirty,
          values: { currentPassword, newPassword, confirmPassword },
          handleReset,
        }) => {
          const showEndAdornment = !!(
            currentPassword ||
            newPassword ||
            confirmPassword
          );

          return (
            <Form>
              <Box
                sx={ {
                  margin: "0 auto",
                  maxWidth: { lg: "700px", xs: "340px" },
                } }
              >
                <Stack rowGap={ 10 }>
                  <Stack rowGap={ 2 }>
                    <Typography fontWeight={ 700 } variant="h4">
                      CHANGE PASSWORD
                    </Typography>
                    { isSocialLogin || isGetUserProfileLoading ? null : (
                      <PasswordInputField
                        label="CURRENT PASSWORD"
                        name="currentPassword"
                        placeholder="Password"
                        showEndAdornment={ showEndAdornment }
                      />
                    ) }

                    <Stack
                      sx={ {
                        flexDirection: { lg: "row", xs: "column" },
                        justifyContent: "space-between",
                        rowGap: 2,
                      } }
                    >
                      <PasswordInputField
                        label="NEW PASSWORD"
                        name="newPassword"
                        placeholder="New password"
                        showEndAdornment={ showEndAdornment }
                      />
                      <PasswordInputField
                        label="RETYPE NEW PASSWORD"
                        name="confirmPassword"
                        placeholder="New password"
                        showEndAdornment={ showEndAdornment }
                      />
                    </Stack>
                  </Stack>
                  <Stack justifyContent="space-between" rowGap={ 2 }>
                    <Stack rowGap={ 0.5 }>
                      <Typography fontWeight={ 700 } variant="h4">
                        DELETE ACCOUNT
                      </Typography>
                      <Typography variant="subtitle1">
                        This action cannot be undone.
                      </Typography>
                    </Stack>
                    <DeleteAccountDialog />
                  </Stack>

                  <Stack justifyContent="space-between" rowGap={ 2 }>
                    <Typography fontWeight={ 700 } variant="h4">
                      ABOUT
                    </Typography>
                    <Link
                      color={ theme.colors.grey100 }
                      href={ NEWM_STUDIO_TERMS_OF_SERVICE_URL }
                      rel="noopener"
                      sx={ { alignSelf: ["center", "center", "flex-start"] } }
                      target="_blank"
                      underline="none"
                      variant="subtitle1"
                    >
                      Terms of Service
                    </Link>
                  </Stack>
                </Stack>

                <HorizontalLine
                  sx={ {
                    mt: 5,
                  } }
                />
                <Stack
                  sx={ {
                    columnGap: 2,
                    flexDirection: { lg: "row", sx: "null" },
                    mt: 5,
                    rowGap: 2,
                  } }
                >
                  <Button
                    color="music"
                    disabled={ !dirty }
                    variant="secondary"
                    width={
                      windowWidth && windowWidth > theme.breakpoints.values.lg
                        ? "compact"
                        : "default"
                    }
                    onClick={ handleReset }
                  >
                    Cancel
                  </Button>
                  <Button
                    isLoading={ isLoading }
                    type="submit"
                    width={
                      windowWidth && windowWidth > theme.breakpoints.values.lg
                        ? "compact"
                        : "default"
                    }
                  >
                    Save
                  </Button>
                </Stack>
              </Box>
            </Form>
          );
        } }
      </Formik>
    </Container>
  );
};
export default Settings;
