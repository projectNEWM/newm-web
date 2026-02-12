import { FunctionComponent, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { Box, useTheme } from "@mui/material";

import * as Yup from "yup";
import { FormikValues } from "formik";
import { useFlags } from "launchdarkly-react-client-sdk";

import { WizardForm } from "@newm-web/elements";
import { removeTrailingSlash } from "@newm-web/utils";

import Verification from "./Verification";
import Welcome from "./Welcome";
import NotFoundPage from "../NotFoundPage";
import {
  commonYupValidation,
  useAppDispatch,
  useBreakpoint,
} from "../../common";
import { createAccount, sendVerificationEmail } from "../../modules/session";

const rootPath = "sign-up";

interface AccountValues {
  readonly authCode: string;
  readonly confirmPassword: string;
  readonly email: string;
  readonly newPassword: string;
  readonly referrer: string;
}

const SignUp: FunctionComponent = () => {
  const { webStudioDisableDistributionAndSales } = useFlags();

  const theme = useTheme();
  const { isDesktop } = useBreakpoint();

  const dispatch = useAppDispatch();
  const currentPathLocation = useLocation();

  // Parse query parameters for referral code
  const queryParams = new URLSearchParams(currentPathLocation.search);
  const referrerCode = queryParams.get("mwr") || "";

  const initialValues: AccountValues = {
    authCode: "",
    confirmPassword: "",
    email: "",
    newPassword: "",
    referrer: referrerCode,
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
    referrer,
  }: FormikValues): void => {
    dispatch(
      createAccount({ authCode, confirmPassword, email, newPassword, referrer })
    );
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
    return <NotFoundPage redirectUrl="/sign-up" />;
  }

  return (
    <Box
      sx={ {
        backgroundColor: theme.colors.black,
        display: "flex",
        flex: 1,
        justifyContent: "center",
        marginTop: webStudioDisableDistributionAndSales && isDesktop ? 2 : 0,
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
