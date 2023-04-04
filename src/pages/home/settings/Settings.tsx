import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Form, Formik, FormikValues } from "formik";
import { Button, HorizontalLine } from "elements";
import { LogoutButton, PasswordInputField } from "components";
import { commonYupValidation, useWindowDimensions } from "common";
import * as Yup from "yup";
import { selectSession, updateProfile } from "modules/session";
import theme from "theme";

const Settings: FunctionComponent = () => {
  const dispatch = useDispatch();

  const windowWidth = useWindowDimensions()?.width;

  const { isLoading } = useSelector(selectSession);

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().when("newPassword", {
      is: (currentValue: string) => currentValue,
      then: Yup.string().required("Current password is required"),
    }),
    newPassword: commonYupValidation.newPassword,
    confirmPassword: commonYupValidation.confirmPassword.when("newPassword", {
      is: (currentValue: string) => currentValue,
      then: Yup.string().required("Confirm new password is required"),
    }),
  });

  /**
   * Update profile data with modifications made.
   */
  const handleSubmit = (values: FormikValues) => {
    const updatedValues = {
      ...(values.currentPassword && {
        currentPassword: values.currentPassword,
      }),
      ...(values.newPassword && { newPassword: values.newPassword }),
      ...(values.confirmPassword && {
        confirmPassword: values.confirmPassword,
      }),
    };

    dispatch(updateProfile({ ...updatedValues }));
  };

  return (
    <Container
      maxWidth={ false }
      sx={ {
        margin: [null, null, 3],
        paddingBottom: 8,
        overflow: "auto",
        textAlign: ["center", "center", "initial"],
      } }
    >
      <Stack direction="row" justifyContent="space-between" mb={ 8 }>
        <Typography variant="h3" fontWeight={ 800 }>
          SETTINGS
        </Typography>{ " " }
        <LogoutButton />
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

                  <Stack justifyContent="space-between" rowGap={ 2 }>
                    <Stack rowGap={ 0.5 }>
                      <Typography variant="h4" fontWeight={ 700 }>
                        DELETE ACCOUNT
                      </Typography>
                      <Typography variant="subtitle1">
                        This action cannot be undone.
                      </Typography>
                    </Stack>
                    <Button variant="secondary" color="magazine">
                      Delete account
                    </Button>
                  </Stack>

                  <Stack justifyContent="space-between" rowGap={ 2 }>
                    <Typography variant="h4" fontWeight={ 700 }>
                      ABOUT
                    </Typography>
                    <Typography variant="subtitle1">
                      Terms of Service
                    </Typography>
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
                    type="reset"
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={ !dirty }
                    isLoading={ isLoading }
                    width={
                      windowWidth && windowWidth > theme.breakpoints.values.lg
                        ? "compact"
                        : "default"
                    }
                    type="submit"
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
