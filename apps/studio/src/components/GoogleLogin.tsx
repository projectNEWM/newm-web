/**
 * Logs the user into the app using the Google Auth API.
 */

import { useGoogleLoginThunk } from "../modules/session";
import { setToastMessage } from "../modules/ui";
import { FunctionComponent, ReactNode } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@newm-web/elements";
import { useAppDispatch } from "../common";

interface Props {
  readonly children?: ReactNode;
}

const GoogleLogin: FunctionComponent<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [logIn] = useGoogleLoginThunk();

  const handleLogin = useGoogleLogin({
    onSuccess: ({ access_token: accessToken }) => {
      if (!accessToken) {
        dispatch(
          setToastMessage({
            heading: "Google",
            message: "Google authentication service offline.",
            severity: "error",
          })
        );
      }

      logIn(accessToken);
    },
  });

  return (
    <Button
      aria-label="google authorization"
      onClick={() => handleLogin()}
      variant="outlined"
      color="white"
      startIcon={<GoogleIcon />}
    >
      {children}
    </Button>
  );
};

export default GoogleLogin;
