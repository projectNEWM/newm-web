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
import { Button } from "elements";

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

  return (
    <GoogleLoginHelper
      clientId={ process.env.REACT_APP_GOOGLE_CLIENT_ID || "" }
      render={ (renderProps) => (
        <Button
          aria-label="google authorization"
          disabled={ renderProps.disabled }
          onClick={ renderProps.onClick }
          variant="outlined"
          color="white"
          sx={ {
            height: "42px",
          } }
        >
          <GoogleIcon style={ { fill: "white" } } />
        </Button>
      ) }
      onSuccess={ handleGoogleRespSuccess }
      redirectUri={ `${window.location.origin}${pathname}` }
      cookiePolicy={ "single_host_origin" }
    />
  );
};

export default GoogleLogin;
