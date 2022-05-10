import * as Yup from "yup";
import { Box, Container, useTheme } from "@mui/material";
import { FormikValues } from "formik";
import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { WizardForm } from "components";
import { createAccount } from "modules/session";
import Verification from "./signUpSteps/Verification";
import Welcome from "./signUpSteps/Welcome";
import { sendVerificationEmail } from "./utils";

interface AccountValues {
  readonly authCode: string;
  readonly confirmPassword: string;
  readonly email: string;
  readonly newPassword: string;
}

const SignUp: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const initialValues: AccountValues = {
    email: "",
    newPassword: "",
    confirmPassword: "",
    authCode: "",
  };

  /**
   * Password regex, it must contain the following:
   * 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number.
   */
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  /**
   * Yup validations for all form fields.
   */
  const validations = {
    authCode: Yup.string().required("Verification code is required"),
    email: Yup.string()
      .email("Please enter a vaild email")
      .required("E-mail is required"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  };

  const handleVerificationEmail = (values: FormikValues): void => {
    dispatch(sendVerificationEmail(values));
  };

  /**
   * Attempts to create an account on submit of the last form route.
   */
  const handleSubmit = ({
    authCode,
    confirmPassword,
    email,
    newPassword,
  }: FormikValues): void => {
    dispatch(createAccount({ authCode, confirmPassword, email, newPassword }));
  };

  return (
    <Box
      sx={ {
        backgroundColor: theme.colors.black,
        display: "flex",
        flex: 1,
        maxWidth: "100%",
        pt: 7.5,
        px: 2,
        textAlign: "center",
      } }
    >
      <Container maxWidth="xl">
        <WizardForm
          initialValues={ initialValues }
          onSubmit={ handleSubmit }
          rootPath="sign-up"
          validateOnMount={ true }
          routes={ [
            {
              element: <Welcome />,
              onSubmitStep: handleVerificationEmail,
              path: "",
              validationSchema: Yup.object().shape({
                email: validations.email,
                newPassword: validations.newPassword,
                confirmPassword: validations.confirmPassword,
              }),
            },
            {
              element: <Verification />,
              path: "verification",
              validationSchema: Yup.object().shape({
                authCode: validations.authCode,
              }),
            },
          ] }
        />
      </Container>
    </Box>
  );
};

export default SignUp;
