/**
 * Logs the user into the app using the Facebook Auth API.
 */

import { FunctionComponent, ReactNode } from "react";
import FacebookLoginHelper, {
  LoginResponse,
} from "@greatsumini/react-facebook-login";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Button } from "@newm-web/elements";
import { VITE_FACEBOOK_CLIENT_ID } from "@newm-web/env";
import { useAppDispatch } from "../common";
import { setToastMessage } from "../modules/ui";
import { useFacebookLoginThunk } from "../modules/session";

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
      appId={ VITE_FACEBOOK_CLIENT_ID || "" }
      render={ ({ onClick }) => (
        <Button
          aria-label="facebook authorization"
          color="white"
          startIcon={ <FacebookIcon /> }
          variant="outlined"
          onClick={ onClick }
        >
          { children }
        </Button>
      ) }
      onSuccess={ handleFacebookLoginSuccess }
    />
  );
};

export default FacebookLogin;
