/**
 * Logs the user into the app using the Facebook Auth API.
 */

import {
  extendedApi as sessionApi,
  setSessionErrorMessage,
} from "modules/session";
import { useLocation } from "react-router-dom";
import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import FacebookLoginHelper from "react-facebook-login/dist/facebook-login-render-props";
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from "react-facebook-login";
import FacebookIcon from "assets/images/FacebookIcon";
import { IconButton } from "@mui/material";

const FacebookLogin: FunctionComponent = () => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const handleFacebookResponse = (
    resp: ReactFacebookLoginInfo | ReactFacebookFailureResponse
  ) => {
    const loginInfo = resp as ReactFacebookLoginInfo;
    const { accessToken } = loginInfo;

    if (!accessToken) {
      dispatch(
        setSessionErrorMessage("Facebook authentication was not successful")
      );
      return;
    }

    dispatch(sessionApi.endpoints.facebookLogin.initiate({ accessToken }));
  };

  return (
    <FacebookLoginHelper
      appId={ process.env.REACT_APP_FACEBOOK_CLIENT_ID || "" }
      callback={ handleFacebookResponse }
      redirectUri={ `${window.location.origin}${pathname}` }
      isMobile={ false } // mobile login has known issues
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render={ (renderProps: any) => (
        <IconButton
          onClick={ renderProps.onClick }
          disabled={ renderProps.disabled }
          aria-label="facebook authorization"
        >
          <FacebookIcon />
        </IconButton>
      ) }
    />
  );
};

export default FacebookLogin;
