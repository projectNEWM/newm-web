import { FunctionComponent } from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { extendedApi as sessionApi } from "modules/session";
import { useDispatch } from "react-redux";
import LinkedInIcon from "assets/images/LinkedInIcon";
import { IconButton } from "@mui/material";

const LinkedInLogin: FunctionComponent = () => {
  const dispatch = useDispatch();

  const { linkedInLogin } = useLinkedIn({
    clientId: process.env.REACT_APP_LINKEDIN_CLIENT_ID || "",
    // clientId: "86v4twvn5jhdyg",
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: (accessToken) => {
      dispatch(sessionApi.endpoints.googleLogin.initiate({ accessToken }));
    },
  });

  return (
    <IconButton onClick={ linkedInLogin }>
      <LinkedInIcon />
    </IconButton>
  );
};

export default LinkedInLogin;
