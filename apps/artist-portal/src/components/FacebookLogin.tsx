/**
 * Logs the user into the app using the Facebook Auth API.
 */

import { useFacebookLoginThunk } from "@newm.io/studio/modules/session";
import { setToastMessage } from "@newm.io/studio/modules/ui";
import { FunctionComponent, ReactNode } from "react";
import FacebookLoginHelper, { LoginResponse } from "@greatsumini/react-facebook-login";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Button } from "@newm.io/studio/elements";
import { useAppDispatch } from "@newm.io/studio/common";

interface Props {
  readonly children?: ReactNode;
}

const FacebookLogin: FunctionComponent<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [logIn] = useFacebookLoginThunk();

  const handleFacebookLoginSuccess = (resp: LoginResponse["authResponse"]) => {
    const accessToken = resp?.accessToken;

    if (!accessToken) {
      dispatch(
        setToastMessage({
          heading: "Facebook",
          message: "Facebook authentication service offline.",
          severity: "error",
        })
      );

      return;
    }

    logIn(accessToken);
  };

  return (
    <FacebookLoginHelper
      appId={ import.meta.env.VITE_FACEBOOK_CLIENT_ID || "" }
      onSuccess={ handleFacebookLoginSuccess }
      render={ ({ onClick }) => (
        <Button
          aria-label="facebook authorization"
          onClick={ onClick }
          variant="outlined"
          color="white"
          startIcon={ <FacebookIcon /> }
        >
          { children }
        </Button>
      ) }
    />
  );
};

export default FacebookLogin;
