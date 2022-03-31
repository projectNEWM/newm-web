/**
 * Logs the user into the app using the Google Auth SDK.
 */

import {
  extendedApi as sessionApi,
  setSessionErrorMessage,
} from "modules/session";
import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import GoogleLoginHelper, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import GoogleIcon from "@mui/icons-material/Google";
import { IconButton } from "@mui/material";

const GoogleLogin: FunctionComponent = () => {
  const dispatch = useDispatch();

  const handleGoogleRespSuccess = (
    resp: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const loginResponse = resp as GoogleLoginResponse;
    const { accessToken } = loginResponse;

    if (!accessToken) {
      dispatch(setSessionErrorMessage("Google authentication service offline"));
      return;
    }

    dispatch(sessionApi.endpoints.googleLogin.initiate({ accessToken }));
  };

  const handleGoogleRespFailure = () => {
    dispatch(setSessionErrorMessage("Google authentication failed"));
  };

  return (
    <GoogleLoginHelper
      clientId={ process.env.REACT_APP_GOOGLE_CLIENT_ID || "" }
      render={ (renderProps) => (
        <IconButton
          onClick={ renderProps.onClick }
          disabled={ renderProps.disabled }
          aria-label="google authorization"
        >
          <GoogleIcon style={ { fill: "white" } } />
        </IconButton>
      ) }
      onSuccess={ handleGoogleRespSuccess }
      onFailure={ handleGoogleRespFailure }
      cookiePolicy={ "single_host_origin" }
    />
  );
};

export default GoogleLogin;
