/**
 * Logs the user into the app using the Google Auth API.
 */

import { extendedApi as sessionApi } from "modules/session";
import { setToastMessage } from "modules/ui";
import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import GoogleLoginHelper, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import GoogleIcon from "@mui/icons-material/Google";
import { IconButton } from "@mui/material";
import theme from "theme";

const GoogleLogin: FunctionComponent = () => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const handleGoogleRespSuccess = (
    resp: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const loginResponse = resp as GoogleLoginResponse;
    const { accessToken } = loginResponse;

    if (!accessToken) {
      dispatch(
        setToastMessage({
          heading: "Google",
          message: "Google authentication service offline.",
          severity: "error",
        })
      );
    }

    dispatch(sessionApi.endpoints.googleLogin.initiate({ accessToken }));
  };

  const handleGoogleRespFailure = () => {
    dispatch(
      setToastMessage({
        heading: "Google",
        message: "Google authentication was not successful.",
        severity: "error",
      })
    );
  };

  return (
    <GoogleLoginHelper
      clientId={ process.env.REACT_APP_GOOGLE_CLIENT_ID || "" }
      render={ (renderProps) => (
        <IconButton
          aria-label="google authorization"
          disabled={ renderProps.disabled }
          onClick={ renderProps.onClick }
          sx={ {
            border: `2px solid ${theme.colors.white}`,
            borderRadius: "4px",
            height: "44px",
            px: 4.25,
          } }
        >
          <GoogleIcon style={ { fill: "white" } } />
        </IconButton>
      ) }
      onSuccess={ handleGoogleRespSuccess }
      onFailure={ handleGoogleRespFailure }
      redirectUri={ `${window.location.origin}${pathname}` }
      cookiePolicy={ "single_host_origin" }
    />
  );
};

export default GoogleLogin;
