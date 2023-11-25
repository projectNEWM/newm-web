import * as Yup from "yup";
import { Box, Container } from "@mui/material";
import { FunctionComponent } from "react";
import { FormikHelpers, FormikValues } from "formik";
import theme from "theme";
import { ResponsiveNEWMLogo, WizardForm } from "components";
import { commonYupValidation, useAppDispatch } from "common";
import { resetPassword, sendVerificationEmail } from "modules/session";
import InitiateReset from "./InitiateReset";
import VerifyEmail from "./VerifyEmail";
import ResetPassword from "./ResetPassword";

const ForgotPassword: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const initialValues = {
    email: "",
    newPassword: "",
    confirmPassword: "",
    authCode: "",
  };

  const handleSubmit = ({
    authCode,
    confirmPassword,
    email,
    newPassword,
  }: FormikValues): void => {
    dispatch(resetPassword({ authCode, confirmPassword, email, newPassword }));
  };

  const handleVerificationEmail = (
    values: FormikValues,
    { setSubmitting }: FormikHelpers<FormikValues>
  ): void => {
    dispatch(sendVerificationEmail(values.email));
    setSubmitting(false);
  };

  return (
    <Container
      maxWidth={ false }
      sx={ {
        alignItems: "center",
        backgroundColor: theme.colors.black,
        display: "flex",
        flexDirection: "column",
        pt: 7.5,
        px: 2,
      } }
    >
      <Box>
        <ResponsiveNEWMLogo />
      </Box>

      <WizardForm
        initialValues={ initialValues }
        onSubmit={ handleSubmit }
        rootPath="forgot-password"
        validateOnMount={ true }
        routes={ [
          {
            element: <InitiateReset />,
            onSubmitStep: handleVerificationEmail,
            path: "",
            validationSchema: Yup.object().shape({
              email: commonYupValidation.email,
            }),
          },
          {
            element: <VerifyEmail />,
            path: "verification",
            validationSchema: Yup.object().shape({
              authCode: Yup.string().required("Verification code is required"),
            }),
          },
          {
            element: <ResetPassword />,
            path: "reset",
            validationSchema: Yup.object().shape({
              newPassword: commonYupValidation.newPassword.required(
                "Password is required"
              ),
              confirmPassword: commonYupValidation.confirmPassword.required(
                "Confirm password is required"
              ),
            }),
          },
        ] }
      />
    </Container>
  );
};

export default ForgotPassword;
