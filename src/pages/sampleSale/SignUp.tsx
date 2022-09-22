import * as Yup from "yup";
import { Box, Container, useTheme } from "@mui/material";
import { FormikValues } from "formik";
import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { WizardForm } from "components";
import { commonYupValidation } from "common";
import {
  sampleSaleCreateAccount,
  sendVerificationEmail,
} from "modules/session";
import Verification from "./Verification";
import Welcome from "./Welcome";

interface AccountValues {
  readonly authCode: string;
  readonly confirmPassword: string;
  readonly email: string;
  readonly newPassword: string;
  readonly walletAddress: string;
}

const SignUp: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const initialValues: AccountValues = {
    authCode: "",
    confirmPassword: "",
    email: "",
    newPassword: "",
    walletAddress: "",
  };

  /**
   * Yup validations for all form fields.
   */
  const validations = {
    authCode: Yup.string().required("Verification code is required"),
    email: commonYupValidation.email,
    newPassword: commonYupValidation.newPassword.required(
      "Password is required"
    ),
    confirmPassword: commonYupValidation.confirmPassword.required(
      "Confirm password is required"
    ),
    walletAddress: commonYupValidation.walletAddress,
  };

  const handleVerificationEmail = (values: FormikValues): void => {
    dispatch(sendVerificationEmail(values.email));
  };

  /**
   * Attempts to create an account on submit of the last form route.
   */
  const handleSubmit = ({
    authCode,
    confirmPassword,
    email,
    newPassword,
    walletAddress,
  }: FormikValues): void => {
    dispatch(
      sampleSaleCreateAccount({
        authCode,
        confirmPassword,
        email,
        newPassword,
        walletAddress,
      })
    );
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
          rootPath="sample-sale"
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
                walletAddress: validations.walletAddress,
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
