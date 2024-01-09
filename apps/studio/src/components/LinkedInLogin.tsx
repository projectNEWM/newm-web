/**
 * Retrieves an authorization code from the LinkedIn API
 * which can be used to request a LinkedIn access token
 * and log the user into the app.
 */

import { FunctionComponent, ReactNode } from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Button } from "@newm-web/elements";
import { VITE_LINKEDIN_CLIENT_ID } from "@newm-web/env";
import { useLinkedInLoginThunk } from "../modules/session";

interface Props {
  readonly children?: ReactNode;
}

const LinkedInLogin: FunctionComponent<Props> = ({ children }) => {
  const [logIn] = useLinkedInLoginThunk();

  const redirectUri = `${window.location.origin}/linkedin`;

  const { linkedInLogin } = useLinkedIn({
    clientId: VITE_LINKEDIN_CLIENT_ID || "",
    onSuccess: (code) => {
      logIn({ code, redirectUri });
    },
    redirectUri,
    scope: "r_liteprofile r_emailaddress",
  });

  return (
    <Button
      aria-label="linkedin authorization"
      color="white"
      startIcon={ <LinkedInIcon /> }
      variant="outlined"
      onClick={ linkedInLogin }
    >
      { children }
    </Button>
  );
};

export default LinkedInLogin;
