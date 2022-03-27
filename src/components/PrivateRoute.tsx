import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { selectSession } from "modules/session";
import { Redirect, Route, RouteProps } from "react-router-dom";

const PrivateRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {
  const { isLoggedIn } = useSelector(selectSession);

  return (
    <Route
      { ...rest }
      render={ ({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={ {
              pathname: "/sign-up",
              state: { from: location },
            } }
          />
        )
      }
    />
  );
};

export default PrivateRoute;
