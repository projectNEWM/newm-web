import { FunctionComponent } from "react";
import { selectSession } from "@newm.io/studio/modules/session";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@newm.io/studio/common";

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAppSelector(selectSession);
  const location = useLocation();

  return isLoggedIn ? (
    children
  ) : (
    <Navigate replace state={{ from: location }} to={"/login"} />
  );
};

export default PrivateRoute;
