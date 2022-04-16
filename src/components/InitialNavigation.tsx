import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { selectSession } from "modules/session";
import { Navigate } from "react-router-dom";

const InitialNavigation: FunctionComponent = () => {
  const { isLoggedIn } = useSelector(selectSession);

  return isLoggedIn ? (
    <Navigate to="home" replace />
  ) : (
    <Navigate to="sign-up" replace />
  );
};

export default InitialNavigation;
