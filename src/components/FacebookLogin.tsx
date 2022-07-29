/**
 * Logs the user into the app using the Facebook Auth API.
 */

import {
  extendedApi as sessionApi,
  setSessionErrorMessage,
} from "modules/session";
import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import FacebookLoginHelper, {
  LoginResponse,
} from "@greatsumini/react-facebook-login";
import FacebookIcon from "assets/images/FacebookIcon";
import { IconButton } from "@mui/material";

const FacebookLogin: FunctionComponent = () => {
  const dispatch = useDispatch();

  const handleFacebookLoginSuccess = (resp: LoginResponse["authResponse"]) => {
    const accessToken = resp?.accessToken;

    if (!accessToken) {
      return;
    }

    dispatch(sessionApi.endpoints.facebookLogin.initiate({ accessToken }));
  };

  const handleFacebookLoginFail = () => {
    dispatch(
      setSessionErrorMessage("Facebook authentication was not successful")
    );
  };

  return (
    <FacebookLoginHelper
      appId={ process.env.REACT_APP_FACEBOOK_CLIENT_ID || "" }
      onSuccess={ handleFacebookLoginSuccess }
      onFail={ handleFacebookLoginFail }
      render={ ({ onClick }) => (
        <IconButton onClick={ onClick } aria-label="facebook authorization">
          <FacebookIcon />
        </IconButton>
      ) }
    />
  );
};

export default FacebookLogin;
