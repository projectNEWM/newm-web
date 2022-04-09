import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { selectSession } from "modules/session";
import { Navigate, useLocation } from "react-router-dom";

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ children }) => {
  const { isLoggedIn } = useSelector(selectSession);
  const location = useLocation();

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to={ "/sign-up" } state={ { from: location } } replace />
  );
};

export default PrivateRoute;
