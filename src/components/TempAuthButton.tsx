/**
 * This is a temporary login / logout button that should be
 * removed after the actual UI is implemented.
 */

import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  selectSession,
  extendedApi as sessionApi,
} from "modules/session";
import { FilledButton } from "elements";

const TempAuthButton: FunctionComponent = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(selectSession);

  const handleLogin = () => {
    dispatch(
      sessionApi.endpoints.login.initiate({
        email: process.env.REACT_APP_TEMP_LOGIN_EMAIL || "",
        password: process.env.REACT_APP_TEMP_LOGIN_PASSWORD || "",
      })
    );
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  return isLoggedIn ? (
    <FilledButton onClick={ handleLogout }>Log out</FilledButton>
  ) : (
    <FilledButton onClick={ handleLogin }>Log in</FilledButton>
  );
};

export default TempAuthButton;
