import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { selectSession } from "modules/session";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ children }) => {
  const { isLoggedIn } = useSelector(selectSession);

  return isLoggedIn ? children : <Navigate to={ "/sign-up" } replace />;

};

export default PrivateRoute;
