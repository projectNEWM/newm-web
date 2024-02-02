/**
 * Logs the user into the app using the Apple Auth API.
 */

import { FunctionComponent, ReactNode } from "react";
import {
  AppleAuthResponse,
  appleAuthHelpers,
  useScript,
} from "react-apple-signin-auth";
import AppleIcon from "@mui/icons-material/Apple";
import { Button } from "@newm-web/elements";
import { VITE_APPLE_CLIENT_ID } from "@newm-web/env";
import { setToastMessage } from "../modules/ui";
import { useAppleLoginThunk } from "../modules/session";
import { useAppDispatch } from "../common";

interface Props {
  readonly children?: ReactNode;
}

const AppleLogin: FunctionComponent<Props> = ({ children }) => {
  useScript(appleAuthHelpers.APPLE_SCRIPT_SRC);
  const dispatch = useAppDispatch();
  const [logIn] = useAppleLoginThunk();

  const redirectUri = `${window.location.href}`;

  const handleLogin = () =>
    appleAuthHelpers.signIn({
      authOptions: {
        clientId: VITE_APPLE_CLIENT_ID || "",
        redirectURI: redirectUri,
        scope: "name email",
        usePopup: true,
      },
      onSuccess: ({ authorization: { code } }: AppleAuthResponse) => {
        if (!code) {
          dispatch(
            setToastMessage({
              heading: "Apple",
              message: "Apple authentication service offline.",
              severity: "error",
            })
          );
        }

        logIn({ code, redirectUri });
      },
    });

  return (
    <Button
      aria-label="apple authorization"
      color="white"
      startIcon={ <AppleIcon /> }
      variant="outlined"
      onClick={ handleLogin }
    >
      { children }
    </Button>
  );
};

export default AppleLogin;
