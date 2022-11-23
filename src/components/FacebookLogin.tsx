/**
 * Logs the user into the app using the Facebook Auth API.
 */

import { extendedApi as sessionApi } from "modules/session";
import { setToastMessage } from "modules/ui";
import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import FacebookLoginHelper, {
  LoginResponse,
} from "@greatsumini/react-facebook-login";
import FacebookIcon from "assets/images/FacebookIcon";
import { Button } from "elements";

const FacebookLogin: FunctionComponent = () => {
  const dispatch = useDispatch();

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

    dispatch(sessionApi.endpoints.facebookLogin.initiate({ accessToken }));
  };

  return (
    <FacebookLoginHelper
      appId={ process.env.REACT_APP_FACEBOOK_CLIENT_ID || "" }
      onSuccess={ handleFacebookLoginSuccess }
      render={ ({ onClick }) => (
        <Button
          aria-label="facebook authorization"
          onClick={ onClick }
          variant="outlined"
          color="white"
          sx={ {
            height: "42px",
          } }
        >
          <FacebookIcon />
        </Button>
      ) }
    />
  );
};

export default FacebookLogin;
