/**
 * Retrieves an authorization code from the LinkedIn API
 * which can be used to request a LinkedIn access token
 * and log the user into the app.
 */

import { FunctionComponent } from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { extendedApi as sessionApi } from "modules/session";
import { useDispatch } from "react-redux";
import LinkedInIcon from "assets/images/LinkedInIcon";
import { IconButton } from "@mui/material";
import theme from "theme";

const LinkedInLogin: FunctionComponent = () => {
  const dispatch = useDispatch();

  const redirectUri = `${window.location.origin}/linkedin`;

  const { linkedInLogin } = useLinkedIn({
    clientId: process.env.REACT_APP_LINKEDIN_CLIENT_ID || "",
    redirectUri,
    scope: "r_liteprofile r_emailaddress",
    onSuccess: (code) => {
      dispatch(
        sessionApi.endpoints.linkedInLogin.initiate({
          code,
          redirectUri,
        })
      );
    },
  });

  return (
    <IconButton
      aria-label="linkedin authorization"
      onClick={ linkedInLogin }
      sx={ {
        border: `2px solid ${theme.colors.white}`,
        borderRadius: "4px",
        height: "44px",
        px: 4.5,
      } }
    >
      <LinkedInIcon />
    </IconButton>
  );
};

export default LinkedInLogin;
