import * as Yup from "yup";
import { Box, useTheme } from "@mui/material";
import { FormikValues } from "formik";
import { FunctionComponent, useCallback, useMemo } from "react";
import { WizardForm } from "@newm-web/elements";
import { useLocation } from "react-router-dom";
import { PageNotFound } from "@newm-web/components";
import { removeTrailingSlash } from "@newm-web/utils";
import Verification from "./Verification";
import Welcome from "./Welcome";
import { commonYupValidation, useAppDispatch } from "../../common";
import { createAccount, sendVerificationEmail } from "../../modules/session";

const rootPath = "sign-up";

interface AccountValues {
  readonly authCode: string;
  readonly confirmPassword: string;
  readonly email: string;
  readonly newPassword: string;
}

const SignUp: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const currentPathLocation = useLocation();

  const initialValues: AccountValues = {
    authCode: "",
    confirmPassword: "",
    email: "",
    newPassword: "",
  };

  const handleVerificationEmail = useCallback(
    ({ email }: FormikValues): void => {
      dispatch(sendVerificationEmail({ email, mustExists: false }));
    },
    [dispatch]
  );

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

  /**
   * Wizard routes for the sign up process.
   */
  const wizardRoutes = useMemo(
    () => [
      {
        element: <Welcome />,
        onSubmitStep: handleVerificationEmail,
        path: "",
        validationSchema: Yup.object().shape({
          confirmPassword: commonYupValidation.confirmPassword.required(
            "Confirm password is required"
          ),
          email: commonYupValidation.email,
          newPassword: commonYupValidation.newPassword.required(
            "Password is required"
          ),
        }),
      },
      {
        element: <Verification />,
        path: "verification",
        validationSchema: Yup.object().shape({
          authCode: Yup.string().required("Verification code is required"),
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
    return <PageNotFound redirectUrl="/sign-up" />;
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
          rootPath={ rootPath }
          routes={ wizardRoutes }
          validateOnMount={ true }
          onSubmit={ handleSubmit }
        />
      </Box>
    </Box>
  );
};

export default SignUp;
