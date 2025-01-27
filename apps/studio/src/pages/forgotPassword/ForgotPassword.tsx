import * as Yup from "yup";
import { Box, Container } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { FormikHelpers, FormikValues } from "formik";
import theme from "@newm-web/theme";
import { WizardForm } from "@newm-web/elements";
import { useLocation } from "react-router";
import { PageNotFound } from "@newm-web/components";
import InitiateReset from "./InitiateReset";
import VerifyEmail from "./VerifyEmail";
import ResetPassword from "./ResetPassword";
import { resetPassword, sendVerificationEmail } from "../../modules/session";
import { commonYupValidation, useAppDispatch } from "../../common";
import { ResponsiveNEWMLogo } from "../../components";

const ForgotPassword: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isValidPath, setIsValidPath] = useState(true); // State to track path validity

  const initialValues = {
    authCode: "",
    confirmPassword: "",
    email: "",
    newPassword: "",
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
    { email }: FormikValues,
    { setSubmitting }: FormikHelpers<FormikValues>
  ): void => {
    dispatch(sendVerificationEmail({ email, mustExists: true }));
    setSubmitting(false);
  };

  useEffect(() => {
    const validPaths = [
      "/forgot-password",
      "/forgot-password/verification",
      "/forgot-password/reset",
    ];

    const normalizePath = (path: string) => path.replace(/\/+$/, ""); // Remove trailing slashes
    const currentPath = normalizePath(location.pathname);

    setIsValidPath(validPaths.map(normalizePath).includes(currentPath));
  }, [location.pathname]);

  if (!isValidPath) {
    return <PageNotFound />;
  }

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
        rootPath="forgot-password"
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
              confirmPassword: commonYupValidation.confirmPassword.required(
                "Confirm password is required"
              ),
              newPassword: commonYupValidation.newPassword.required(
                "Password is required"
              ),
            }),
          },
        ] }
        validateOnMount={ true }
        onSubmit={ handleSubmit }
      />
    </Container>
  );
};

export default ForgotPassword;
