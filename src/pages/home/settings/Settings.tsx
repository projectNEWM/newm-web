import { FunctionComponent } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { Button, HorizontalLine } from "elements";
import { LogoutButton, PasswordInputField } from "components";
import {
  commonYupValidation,
  getUpdatedValues,
  useWindowDimensions,
} from "common";
import * as Yup from "yup";
import {
  ChangePasswordRequest,
  emptyProfile,
  useChangePasswordThunk,
  useGetProfileQuery,
} from "modules/session";
import theme from "theme";
import DeleteAccountDialog from "./DeleteAccountDialog";

const Settings: FunctionComponent = () => {
  const windowWidth = useWindowDimensions()?.width;

  const { data: { oauthType } = emptyProfile } = useGetProfileQuery();
  const isLoginUsernameAndPassword = !oauthType;

  const [changePassword, isLoading] = useChangePasswordThunk();

  const initialValues: ChangePasswordRequest = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  // TODO add validation for different password than current on new password
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: commonYupValidation.newPassword.when("currentPassword", {
      is: (currentValue: string) => currentValue,
      then: Yup.string().required("New password is required"),
    }),
    confirmPassword: commonYupValidation.confirmPassword.when("newPassword", {
      is: (currentValue: string) => currentValue,
      then: Yup.string().required("Must match new password"),
    }),
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
        paddingBottom: 8,
        overflow: "auto",
        textAlign: ["center", "center", "initial"],
      } }
    >
      <Stack direction="row" justifyContent="space-between" mb={ 8 }>
        <Typography variant="h3" fontWeight={ 800 }>
          SETTINGS
        </Typography>{ " " }
        <Stack>
          <LogoutButton />
        </Stack>
      </Stack>

      <Formik
        enableReinitialize={ true }
        initialValues={ initialValues }
        onSubmit={ handleSubmit }
        validationSchema={ validationSchema }
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
                  maxWidth: { xs: "340px", lg: "700px" },
                  margin: "0 auto",
                } }
              >
                <Stack rowGap={ 10 }>
                  { isLoginUsernameAndPassword ? (
                    <Stack rowGap={ 2 }>
                      <Typography variant="h4" fontWeight={ 700 }>
                        CHANGE PASSWORD
                      </Typography>
                      <PasswordInputField
                        label="CURRENT PASSWORD"
                        name="currentPassword"
                        placeholder="Password"
                        showEndAdornment={ showEndAdornment }
                      />
                      <Stack
                        sx={ {
                          flexDirection: { xs: "column", lg: "row" },
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
                  ) : (
                    <Stack rowGap={ 1 }>
                      <Typography variant="h4">CHANGE PASSWORD</Typography>
                      <Typography variant="subtitle1">
                        This account uses { oauthType } for authentication.
                      </Typography>
                    </Stack>
                  ) }
                  <Stack justifyContent="space-between" rowGap={ 2 }>
                    <Stack rowGap={ 0.5 }>
                      <Typography variant="h4" fontWeight={ 700 }>
                        DELETE ACCOUNT
                      </Typography>
                      <Typography variant="subtitle1">
                        This action cannot be undone.
                      </Typography>
                    </Stack>
                    <DeleteAccountDialog />
                  </Stack>

                  <Stack justifyContent="space-between" rowGap={ 2 }>
                    <Typography variant="h4" fontWeight={ 700 }>
                      ABOUT
                    </Typography>
                    <Typography variant="subtitle1">
                      Terms of Service { /* TODO update with link*/ }
                    </Typography>
                  </Stack>
                </Stack>

                <HorizontalLine
                  sx={ {
                    mt: 5,
                  } }
                />
                { isLoginUsernameAndPassword ? (
                  <Stack
                    sx={ {
                      columnGap: 2,
                      flexDirection: { sx: "null", lg: "row" },
                      mt: 5,
                      rowGap: 2,
                    } }
                  >
                    <Button
                      disabled={ !dirty }
                      width={
                        windowWidth && windowWidth > theme.breakpoints.values.lg
                          ? "compact"
                          : "default"
                      }
                      variant="secondary"
                      color="music"
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
                ) : null }
              </Box>
            </Form>
          );
        } }
      </Formik>
    </Container>
  );
};
export default Settings;
