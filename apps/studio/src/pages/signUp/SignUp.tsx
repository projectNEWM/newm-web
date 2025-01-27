import * as Yup from "yup";
import { Box, useTheme } from "@mui/material";
import { FormikValues } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { WizardForm } from "@newm-web/elements";
import { useLocation } from "react-router";
import { PageNotFound } from "@newm-web/components";
import Verification from "./Verification";
import Welcome from "./Welcome";
import { commonYupValidation, useAppDispatch } from "../../common";
import { createAccount, sendVerificationEmail } from "../../modules/session";

interface AccountValues {
  readonly authCode: string;
  readonly confirmPassword: string;
  readonly email: string;
  readonly newPassword: string;
}

const SignUp: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isValidPath, setIsValidPath] = useState(true); // State to track path validity

  const initialValues: AccountValues = {
    authCode: "",
    confirmPassword: "",
    email: "",
    newPassword: "",
  };

  /**
   * Yup validations for all form fields.
   */
  const validations = {
    authCode: Yup.string().required("Verification code is required"),
    confirmPassword: commonYupValidation.confirmPassword.required(
      "Confirm password is required"
    ),
    email: commonYupValidation.email,
    newPassword: commonYupValidation.newPassword.required(
      "Password is required"
    ),
  };

  const handleVerificationEmail = ({ email }: FormikValues): void => {
    dispatch(sendVerificationEmail({ email, mustExists: false }));
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

  useEffect(() => {
    const validPaths = ["/sign-up", "/sign-up/verification"];

    const normalizePath = (path: string) => path.replace(/\/+$/, ""); // Remove trailing slashes
    const currentPath = normalizePath(location.pathname);

    setIsValidPath(validPaths.map(normalizePath).includes(currentPath));
  }, [location.pathname]);

  if (!isValidPath) {
    return <PageNotFound />;
  }

  return (
    <Box
      sx={ {
        backgroundColor: theme.colors.black,
        display: "flex",
        flex: 1,
        justifyContent: "center",
        maxWidth: "100%",
        pt: 5,
        px: 2,
        textAlign: "center",
      } }
    >
      <Box width="100%">
        <WizardForm
          initialValues={ initialValues }
          rootPath="sign-up"
          routes={ [
            {
              element: <Welcome />,
              onSubmitStep: handleVerificationEmail,
              path: "",
              validationSchema: Yup.object().shape({
                confirmPassword: validations.confirmPassword,
                email: validations.email,
                newPassword: validations.newPassword,
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
          validateOnMount={ true }
          onSubmit={ handleSubmit }
        />
      </Box>
    </Box>
  );
};

export default SignUp;
