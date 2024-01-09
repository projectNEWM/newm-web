import { FunctionComponent } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { selectSession } from "../modules/session";
import { useAppSelector } from "../common";

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAppSelector(selectSession);
  const location = useLocation();

  return isLoggedIn ? (
    children
  ) : (
    <Navigate state={ { from: location } } to={ "/login" } replace />
  );
};

export default PrivateRoute;
