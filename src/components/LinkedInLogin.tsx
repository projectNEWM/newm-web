/**
 * Retrieves an authorization code from the LinkedIn API
 * which can be used to request a LinkedIn access token
 * and log the user into the app.
 */

import { FunctionComponent, ReactNode } from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { extendedApi as sessionApi } from "modules/session";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Button } from "elements";
import { useAppDispatch } from "common";

interface Props {
  readonly children?: ReactNode;
}

const LinkedInLogin: FunctionComponent<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

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
    <Button
      aria-label="linkedin authorization"
      onClick={ linkedInLogin }
      variant="outlined"
      color="white"
      startIcon={ <LinkedInIcon /> }
    >
      { children }
    </Button>
  );
};

export default LinkedInLogin;
