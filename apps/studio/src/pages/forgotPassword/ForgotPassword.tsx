import * as Yup from "yup";
import { Box, Container } from "@mui/material";
import { FunctionComponent, useCallback, useMemo } from "react";
import { FormikHelpers, FormikValues } from "formik";
import theme from "@newm-web/theme";
import { WizardForm } from "@newm-web/elements";
import { useLocation } from "react-router";
import { PageNotFound } from "@newm-web/components";
import { removeTrailingSlash } from "@newm-web/utils";
import InitiateReset from "./InitiateReset";
import VerifyEmail from "./VerifyEmail";
import ResetPassword from "./ResetPassword";
import { resetPassword, sendVerificationEmail } from "../../modules/session";
import { commonYupValidation, useAppDispatch } from "../../common";
import { ResponsiveNEWMLogo } from "../../components";

const rootPath = "forgot-password";

const ForgotPassword: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const currentPathLocation = useLocation();

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

  const handleVerificationEmail = useCallback(
    (
      { email }: FormikValues,
      { setSubmitting }: FormikHelpers<FormikValues>
    ): void => {
      dispatch(sendVerificationEmail({ email, mustExists: true }));
      setSubmitting(false);
    },
    [dispatch]
  );

  const wizardRoutes = useMemo(
    () => [
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
    ],
    [handleVerificationEmail]
  );

  /**
   * Check if the current path is a valid path, if not, show a 404 page.
   */
  const currentPathName = removeTrailingSlash(currentPathLocation.pathname);
  const validPaths = useMemo(
    () =>
      wizardRoutes.map((route) =>
        removeTrailingSlash(`/${rootPath}/${route.path}`)
      ),
    [wizardRoutes]
  );
  const isValidPath = validPaths.includes(currentPathName);

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
        rootPath={ rootPath }
        routes={ wizardRoutes }
        validateOnMount={ true }
        onSubmit={ handleSubmit }
      />
    </Container>
  );
};

export default ForgotPassword;
